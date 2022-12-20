import { StatusResponse } from '@mardotio/api-types';
import { ApiFetch } from './ApiFetch';

// eslint-disable-next-line import/prefer-default-export
export const StatusesApi = {
  getAll: () => ApiFetch.fetch<StatusResponse[]>('/statuses', 'GET'),
  getById: (statusId: string) =>
    ApiFetch.fetch<StatusResponse>(`/statuses/${statusId}`, 'GET'),
};
