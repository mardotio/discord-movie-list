import { ApiFetch } from './ApiFetch';
import { MovieResponse } from '@mardotio/api-types';

// eslint-disable-next-line import/prefer-default-export
export const BotApi = {
  pickMovie: () => ApiFetch.fetch<MovieResponse>('/bot/movies/random', 'GET'),
};
