import { UserResponse } from '@mardotio/api-types';
import { ApiFetch } from './ApiFetch';

// eslint-disable-next-line import/prefer-default-export
export const UsersApi = {
  getCurrentUser: () => ApiFetch.fetch<UserResponse>('/users/@me', 'GET'),
};
