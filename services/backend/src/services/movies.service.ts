import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { body, param, query, validationResult } from 'express-validator';
import Movie from '@entities/Movie';
import User from '@entities/User';
import {
  CreateMovieRequest,
  MovieResponse,
  MovieStatusCreateRequest,
  UpdateMovieRequest,
} from '@shared/movie';
import MovieStatus from '@entities/MovieStatus';
import { ReactionResponse, UpdateMovieReactionRequest } from '@shared/reaction';
import Reaction from '@entities/Reaction';
import { getAvatarUrl } from '@util/discord';
import { PaginatedResponse } from '@shared/utility';

const APPROVAL_COUNT = 2;

const toUserReaction = (reaction?: Reaction): MovieResponse['userReaction'] =>
  !reaction
    ? null
    : {
        id: reaction.id,
        reaction: reaction.reaction,
      };

const toReaction = (reaction: Reaction): ReactionResponse => ({
  id: reaction.id,
  reaction: reaction.reaction,
  user: {
    id: reaction.user.id,
    displayName: reaction.user.nickname
      ? reaction.user.nickname
      : `${reaction.user.username}#${reaction.user.usernameId}`,
    avatarLink: getAvatarUrl(reaction.user),
  },
});

export const toMovieResponse = (
  movie: Movie,
  user: User,
  status: MovieStatus,
  reactions: Reaction[],
  userId: string,
): MovieResponse => ({
  name: movie.name,
  id: movie.id,
  addedOn: movie.addedOn.getTime(),
  user: {
    id: user.id,
    displayName: user.nickname
      ? user.nickname
      : `${user.username}#${user.usernameId}`,
    avatarLink: getAvatarUrl(user),
  },
  status: {
    displayName: status.displayName,
    order: status.order,
  },
  userReaction: toUserReaction(reactions.find((r) => r.user.id === userId)),
  reactions: reactions.map(toReaction),
  watchedOn: movie.watchedOn ? movie.watchedOn.getTime() : null,
});

export const getMovies = async (req: Request, res: Response) => {
  const moviesRepo = getRepository(Movie);
  const movies = await moviesRepo.find({
    relations: ['user', 'status', 'reactions', 'reactions.user'],
  });
  return res
    .status(200)
    .send(
      movies.map((m) =>
        toMovieResponse(m, m.user, m.status, m.reactions, req.jwtPayload.id),
      ),
    );
};

export const validateCreateMovie = () => [body('name').isString().notEmpty()];

const INITIAL_MOVIE_STATUS: MovieStatusCreateRequest[] = [
  {
    displayName: 'Suggested',
    order: 0,
  },
  {
    displayName: 'Pending',
    order: 1,
  },
  {
    displayName: 'Watched',
    order: 2,
  },
];

const initializeMovieStatuses = async () => {
  const statusRepo = getRepository(MovieStatus);
  const saveRequests = INITIAL_MOVIE_STATUS.map((s) => {
    const newStatus = new MovieStatus();
    return statusRepo.save({ ...newStatus, ...s });
  });
  await Promise.all(saveRequests);
};

export const addMovie = async (
  req: Request<{}, {}, CreateMovieRequest>,
  res: Response,
) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const statusRepo = getRepository(MovieStatus);
  const statusCount = await statusRepo.count();
  const movieRepo = getRepository(Movie);
  const userRepo = getRepository(User);

  if (statusCount <= 0) {
    await initializeMovieStatuses();
  }

  const status = await statusRepo.findOneOrFail({ order: 0 });

  const user = await userRepo.findOneOrFail({ id: req.jwtPayload.id });
  const { name } = req.body;

  const createdMovie = await movieRepo.save({
    ...new Movie(),
    name,
    user,
    status,
  });
  return res
    .status(200)
    .send(toMovieResponse(createdMovie, user, status, [], req.jwtPayload.id));
};

export const validateGetMoviesByStatus = () => [
  param('statusId').isUUID(),
  query('pageSize').isNumeric().optional(),
  query('order').isIn(['ASC', 'DESC']).optional(),
  query('page').isNumeric(),
];

interface PaginatedOptions {
  pageSize: number;
  page: number;
  order: 'ASC' | 'DESC';
}

const getPaginatedOptions = (
  queryParams: Request['query'],
): PaginatedOptions => {
  const { pageSize = 10, order = 'ASC', page = 1 } = queryParams;

  return {
    pageSize: Number(pageSize),
    order: order as 'ASC' | 'DESC',
    page: Number(page),
  };
};

const toPaginatedResponse = <T>(
  data: T[],
  totalCount: number,
  pageSize: number,
  currentPage: number,
  order: 'ASC' | 'DESC',
): PaginatedResponse<T> => ({
  data,
  totalCount,
  pageCount: Math.ceil(totalCount / pageSize),
  pageSize,
  currentPage,
  order,
});

export const getMoviesByStatus = async (req: Request, res: Response) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { pageSize, page, order } = getPaginatedOptions(req.query);

  const { statusId } = req.params;

  const statusRepo = getRepository(MovieStatus);
  const moviesRepo = getRepository(Movie);
  const status = await statusRepo.findOne(statusId);

  if (!status) {
    return res.status(404).json({
      errors: [{ message: `Could not find movie status with ID ${statusId}` }],
    });
  }

  const [movies, moviesCount] = await moviesRepo.findAndCount({
    relations: ['user', 'reactions', 'reactions.user'],
    where: { status },
    take: pageSize,
    skip: (page - 1) * 10,
    order: status.order === 2 ? { watchedOn: order } : { addedOn: order },
  });

  return res.status(200).json(
    toPaginatedResponse(
      movies.map((m) =>
        toMovieResponse(m, m.user, status, m.reactions, req.jwtPayload.id),
      ),
      moviesCount,
      pageSize,
      page,
      order,
    ),
  );
};

export const validateUpdateMovieReaction = () => [
  body('reaction').isString().notEmpty(),
  param('movieId').isUUID(),
];

const handleStatus0Reaction = async (
  reaction: string,
  user: User,
  movie: Movie,
  res: Response,
) => {
  if (reaction !== 'thumbsDown' && reaction !== 'thumbsUp') {
    return res
      .status(400)
      .json({ errors: { message: 'Can only react with thumbsUp/thumbsDown' } });
  }

  const thumbsUpCount = movie.reactions.filter(
    (r) => r.reaction === 'thumbsUp',
  );
  const thumbsDownCount = movie.reactions.filter(
    (r) => r.reaction === 'thumbsDown',
  );

  const movieRepo = getRepository(Movie);
  const reactionRepo = getRepository(Reaction);
  const statusRepo = getRepository(MovieStatus);

  if (reaction === 'thumbsUp' && thumbsUpCount.length + 1 >= APPROVAL_COUNT) {
    const nextStatus = await statusRepo.findOne({ order: 1 });

    if (!nextStatus) {
      return res
        .status(409)
        .json({ errors: { message: 'Could not find next status' } });
    }
    await reactionRepo.delete({ movie });
    await movieRepo.update(movie.id, { status: nextStatus });

    return res.status(204).send();
  }

  if (
    reaction === 'thumbsDown' &&
    thumbsDownCount.length + 1 >= APPROVAL_COUNT
  ) {
    await movieRepo.delete(movie.id);
    return res.status(204).send();
  }

  const currentReaction = await reactionRepo.findOne({ movie, user });

  if (currentReaction) {
    await reactionRepo.save({
      ...currentReaction,
      reaction,
    });
    return res.status(204).send();
  }

  await reactionRepo.save({
    ...new Reaction(),
    user,
    movie,
    reaction,
  });

  return res.status(204).send();
};

const handleStatus1Reaction = (res: Response) => {
  res.status(400).json({
    errors: { message: 'Cannot react to a movie that has not been watched' },
  });
};

export const updateMovieReaction = async (
  req: Request<never, never, UpdateMovieReactionRequest>,
  res: Response,
) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const user = new User();
  user.id = req.jwtPayload.id;
  const { movieId } = req.params;
  const movieRepo = getRepository(Movie);
  const movie = await movieRepo.findOne(movieId, {
    relations: ['status', 'reactions'],
  });

  if (!movie) {
    return res
      .status(404)
      .json({ errors: { message: `Movie ${movieId} does not exist` } });
  }

  if (movie.status.order === 0) {
    return handleStatus0Reaction(req.body.reaction, user, movie, res);
  }

  if (movie.status.order === 1) {
    return handleStatus1Reaction(res);
  }

  const reactionRepo = getRepository(Reaction);
  const currentReaction = await reactionRepo.findOne({ movie, user });

  if (currentReaction) {
    await reactionRepo.save({
      ...currentReaction,
      reaction: req.body.reaction,
    });
    return res.status(204).send();
  }

  await reactionRepo.save({
    ...new Reaction(),
    user,
    movie,
    reaction: req.body.reaction,
  });

  return res.status(204).send();
};

export const validateUpdateMovie = () => [
  body('name').isString().notEmpty().optional(),
  body('statusId').isUUID().optional(),
  param('movieId').isUUID(),
];

const getWatchedOnDate = (movie: Movie, newStatus: MovieStatus) => {
  if (newStatus.order !== 2) {
    return null;
  }

  return movie.watchedOn || new Date();
};

export const updateMovie = async (
  req: Request<never, never, UpdateMovieRequest>,
  res: Response,
) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { movieId } = req.params;
  const movieRepo = getRepository(Movie);
  const reactionRepo = getRepository(Reaction);
  const statusRepo = getRepository(MovieStatus);
  const targetMovie = await movieRepo.findOne(movieId, {
    relations: ['status'],
  });

  if (!targetMovie) {
    return res
      .status(404)
      .json({ errors: `Could not find movie by ID ${movieId}` });
  }

  const targetStatus = await statusRepo.findOne(
    req.body.statusId || targetMovie.status.id,
  );

  if (!targetStatus) {
    return res.status(400).json({
      errors: `Status with id ${
        req.body.statusId || targetMovie.status.id
      } does not exist`,
    });
  }

  await movieRepo.update(targetMovie.id, {
    name: req.body.name || targetMovie.name,
    status: targetStatus,
    watchedOn: getWatchedOnDate(targetMovie, targetStatus),
  });

  if (targetStatus.id !== targetMovie.status.id) {
    await reactionRepo.delete({ movie: targetMovie });
  }

  return res.status(204).send();
};

export const validateSearchMovie = () => [query('query').isString().notEmpty()];

export const searchMovies = async (req: Request, res: Response) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const moviesRepo = getRepository(Movie);

  const matchingMovies = await moviesRepo
    .createQueryBuilder('movie')
    .leftJoinAndSelect('movie.user', 'user')
    .leftJoinAndSelect('movie.status', 'status')
    .leftJoinAndSelect('movie.reactions', 'reactions')
    .leftJoinAndSelect('reactions.user', 'reaction.user')
    .where('name ILIKE :query', { query: `%${req.query.query}%` })
    .getMany();

  return res
    .status(200)
    .json(
      matchingMovies.map((m) =>
        toMovieResponse(m, m.user, m.status, m.reactions, req.jwtPayload.id),
      ),
    );
};
