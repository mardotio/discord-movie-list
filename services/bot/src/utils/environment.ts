import generateEnvironment from '@mardotio/generate-environment';

const validateEnv = () => {
  const result = generateEnvironment({
    required: [
      'DISCORD_BOT_TOKEN',
      'DISCORD_JWT_SECRET',
      'DISCORD_BOT_JWT_SECRET',
      'UI_ENDPOINT',
      'DISCORD_BOT_ID',
    ] as const,
    optional: ['ENVIRONMENT_MODE'] as const,
  });

  if (result.errors !== null) {
     throw new Error(`The following environment variables were not set:\n${result.errors.join('\n')}`);
  }

  return result.environment;
};

export const BOT_ENVIRONMENT = validateEnv();

export const isProduction =
  !BOT_ENVIRONMENT.ENVIRONMENT_MODE ||
  BOT_ENVIRONMENT.ENVIRONMENT_MODE.toLowerCase() === 'production';
