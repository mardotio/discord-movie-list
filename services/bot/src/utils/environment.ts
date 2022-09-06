import generateEnvironment from '@mardotio/generate-environment';

type BotRequiredEnvVars =
  | 'DISCORD_BOT_TOKEN'
  | 'DISCORD_JWT_SECRET'
  | 'DISCORD_BOT_JWT_SECRET'
  | 'UI_ENDPOINT'
  | 'DISCORD_BOT_ID';

type BotOptionalEnvVars = 'ENVIRONMENT_MODE';

const BOT_REQUIRED_ENV_VARS: BotRequiredEnvVars[] = [
  'DISCORD_BOT_TOKEN',
  'DISCORD_JWT_SECRET',
  'DISCORD_BOT_JWT_SECRET',
  'UI_ENDPOINT',
  'DISCORD_BOT_ID',
];

const BOT_OPTIONAL_ENV_VARS: BotOptionalEnvVars[] = ['ENVIRONMENT_MODE'];

export const BOT_ENVIRONMENT = generateEnvironment(
  BOT_REQUIRED_ENV_VARS,
  BOT_OPTIONAL_ENV_VARS,
);

export const isProduction =
  !BOT_ENVIRONMENT.ENVIRONMENT_MODE ||
  BOT_ENVIRONMENT.ENVIRONMENT_MODE.toLowerCase() === 'production';
