import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import Movie from '@entities/Movie';
import MovieStatus from '@entities/MovieStatus';
import { toMovieResponse } from '@services/movies.service';
import { format } from 'date-fns';

// eslint-disable-next-line import/prefer-default-export
export const pickMovie = async (req: Request, res: Response) => {
  const movieRepo = getRepository(Movie);
  const statusRepo = getRepository(MovieStatus);

  const toWatchStatus = await statusRepo.findOne({ order: 1 });

  if (!toWatchStatus) {
    return res
      .status(400)
      .json({ errors: { message: 'Could not find status' } });
  }
  const status = new MovieStatus();
  status.id = toWatchStatus.id;

  const availableMoviesCount = await movieRepo.count({ where: { status } });

  if (availableMoviesCount <= 0) {
    return res
      .status(404)
      .json({ errors: { message: 'Could not find any movies to watch' } });
  }

  const movieIndex = Math.floor(Math.random() * availableMoviesCount);

  const selectedMovie = await movieRepo.find({
    relations: ['user'],
    where: { status },
    order: { addedOn: 'ASC' },
    skip: movieIndex,
    take: 1,
  });

  if (!selectedMovie || selectedMovie.length < 1) {
    return res
      .status(404)
      .json({ errors: { message: 'Could not find any movies to watch' } });
  }

  const [movieToWatch] = selectedMovie;

  console.log(`--- ${format(new Date(), 'MM/dd/yyyy h:mm:ss a')} ---
    Pending movies: ${availableMoviesCount}
    Selected index: ${movieIndex}
    Selected movie: ${movieToWatch.name}
  `);

  return res
    .status(200)
    .json(
      toMovieResponse(
        movieToWatch,
        movieToWatch.user,
        toWatchStatus,
        [],
        req.jwtPayload.id,
      ),
    );
};
