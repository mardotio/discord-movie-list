import { createResource, createSignal } from 'solid-js';
import { ApiConfig, TokenApi } from '../client';

export const createToken = () => {
  const [loginToken, setLoginToken] = createSignal<string>();
  const [tokenMetadata] = createResource(loginToken, async (token) => {
    ApiConfig.headers = {
      authorization: `Bearer ${token}`,
    };

    return TokenApi.create();
  });

  return [tokenMetadata, { getToken: setLoginToken }] as const;
};

export default createToken;
