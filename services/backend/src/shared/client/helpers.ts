import { ApiError } from './ApiFetch';

export const isErrorResponse = <T, K = Exclude<T, ApiError>>(
  response: K | ApiError,
): response is ApiError => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const r = response as any;

  if (!r) {
    return false;
  }

  if (r.status && r.statusText) {
    return true;
  }

  return false;
};

export const isSuccessResponse = <T, K = Exclude<T, ApiError>>(
  response: K | ApiError,
): response is K => !isErrorResponse(response);
