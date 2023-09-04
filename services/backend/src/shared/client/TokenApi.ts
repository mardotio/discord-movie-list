import { CreateTokenResponse } from 'apiTypes';
import { ApiFetch } from './ApiFetch';

// eslint-disable-next-line import/prefer-default-export
export const TokenApi = {
  create: () => ApiFetch.fetch<CreateTokenResponse>('/token', 'POST'),
};
