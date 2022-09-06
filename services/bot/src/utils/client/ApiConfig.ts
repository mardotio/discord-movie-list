import { RequestInit } from 'node-fetch';

class Config {
  baseEndpoint: string | null = null;

  headers: RequestInit['headers'] = undefined;
}

// eslint-disable-next-line import/prefer-default-export
export const ApiConfig = new Config();
