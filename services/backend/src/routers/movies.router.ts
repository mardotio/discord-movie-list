import express from 'express';
import {
  addMovie,
  getMovies,
  getMoviesByStatus,
  searchMovies,
  updateMovie,
  updateMovieReaction,
  validateCreateMovie,
  validateGetMoviesByStatus,
  validateSearchMovie,
  validateUpdateMovie,
  validateUpdateMovieReaction,
} from '@services/movies.service';

const moviesRouter = express.Router();

moviesRouter.get('/', getMovies);
moviesRouter.post('/', ...validateCreateMovie(), addMovie);
moviesRouter.get(
  '/status/:statusId',
  ...validateGetMoviesByStatus(),
  getMoviesByStatus,
);
moviesRouter.put(
  '/:movieId/reaction',
  ...validateUpdateMovieReaction(),
  updateMovieReaction,
);
moviesRouter.patch('/:movieId', ...validateUpdateMovie(), updateMovie);
moviesRouter.get('/search', ...validateSearchMovie(), searchMovies);

export default moviesRouter;
