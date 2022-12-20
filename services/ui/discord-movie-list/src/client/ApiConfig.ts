class Config {
  baseEndpoint: string | null = null;

  // eslint-disable-next-line no-undef
  headers: RequestInit['headers'];
}

// eslint-disable-next-line import/prefer-default-export
export const ApiConfig = new Config();
