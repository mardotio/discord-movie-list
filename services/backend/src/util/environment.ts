import generateEnvironment from '@shared/generateEnvironment';

type EnvironmentVariables =
  | 'POSTGRES_DB'
  | 'POSTGRES_USER'
  | 'POSTGRES_PASSWORD'
  | 'POSTGRES_PORT'
  | 'POSTGRES_HOST'
  | 'SERVER_PORT'
  | 'APP_HOST'
  | 'DISCORD_HOOK'
  | 'JWT_SECRET'
  | 'DISCORD_BOT_JWT_SECRET'
  | 'DISCORD_JWT_SECRET';

type OptionalEnvironmentVariables = 'ENVIRONMENT_MODE';

const ENVIRONMENT_VARIABLES: EnvironmentVariables[] = [
  'POSTGRES_DB',
  'POSTGRES_USER',
  'POSTGRES_PASSWORD',
  'POSTGRES_PORT',
  'POSTGRES_HOST',
  'SERVER_PORT',
  'DISCORD_JWT_SECRET',
  'JWT_SECRET',
  'DISCORD_BOT_JWT_SECRET',
  // 'APP_HOST',
  // 'DISCORD_HOOK',
];

const OPTIONAL_ENVIRONMENT_VARIABLES: OptionalEnvironmentVariables[] = [
  'ENVIRONMENT_MODE',
];

const APP_ENVIRONMENT = generateEnvironment(
  ENVIRONMENT_VARIABLES,
  OPTIONAL_ENVIRONMENT_VARIABLES,
);

export const isProduction =
  !APP_ENVIRONMENT.ENVIRONMENT_MODE ||
  APP_ENVIRONMENT.ENVIRONMENT_MODE.toLowerCase() === 'production';

export default APP_ENVIRONMENT;
