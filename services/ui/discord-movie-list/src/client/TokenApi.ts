import { TokenResponse } from '@mardotio/api-types';
import { ApiFetch } from './ApiFetch';

// eslint-disable-next-line import/prefer-default-export
export const TokenApi = {
  create: () => ApiFetch.fetch<TokenResponse>('/token', 'POST'),
};
