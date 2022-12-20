import {
  CreateMovieRequest,
  MovieResponse,
  PaginatedResponse,
  UpdateMovieReactionRequest,
  UpdateMovieRequest,
} from '@mardotio/api-types';
import { ApiFetch } from './ApiFetch';

// eslint-disable-next-line import/prefer-default-export
export const MoviesApi = {
  getAll: () => ApiFetch.fetch<MovieResponse[]>('/movies', 'GET'),
  create: (body: CreateMovieRequest) =>
    ApiFetch.fetch<MovieResponse, CreateMovieRequest>('/movies', 'POST', body),
  getByStatus: (
    statusId: string,
    options: { pageSize: number; page: number; order: 'ASC' | 'DESC' },
  ) =>
    ApiFetch.fetch<PaginatedResponse<MovieResponse>>(
      `/movies/status/${statusId}?page=${options.page}&pageSize=${options.pageSize}&order=${options.order}`,
      'GET',
    ),
  updateReaction: (movieId: string, body: UpdateMovieReactionRequest) =>
    ApiFetch.fetch<undefined, UpdateMovieReactionRequest>(
      `/movies/${movieId}/reaction`,
      'PUT',
      body,
    ),
  update: (movieId: string, body: UpdateMovieRequest) =>
    ApiFetch.fetch<undefined, UpdateMovieRequest>(
      `/movies/${movieId}`,
      'PATCH',
      body,
    ),
  search: (query: string) =>
    ApiFetch.fetch<MovieResponse[]>(`/movies/search?query=${query}`, 'GET'),
};
