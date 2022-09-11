import { ApiFetch } from './ApiFetch';
import { UserResponse } from '../../apiTypes';

// eslint-disable-next-line import/prefer-default-export
export const UsersApi = {
  getCurrentUser: () => ApiFetch.fetch<UserResponse>('/users/@me', 'GET'),
};
