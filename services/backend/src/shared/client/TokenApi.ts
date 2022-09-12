import { ApiFetch } from './ApiFetch';
import { TokenResponse } from '../../apiTypes';

// eslint-disable-next-line import/prefer-default-export
export const TokenApi = {
  create: () => ApiFetch.fetch<TokenResponse>('/token', 'POST'),
};
