import { ApiFetch } from './ApiFetch';
import { MovieResponse } from '../movie';

// eslint-disable-next-line import/prefer-default-export
export const BotApi = {
  pickMovie: () => ApiFetch.fetch<MovieResponse>('/bot/movies/random', 'GET'),
};
