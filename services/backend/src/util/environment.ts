import generateEnvironment from '@mardotio/generate-environment';

const validateEnv = () => {
  const result = generateEnvironment({
    required: [
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
    ] as const,
    optional: ['ENVIRONMENT_MODE'] as const,
  });

  if (result.errors !== null) {
     throw new Error(`The following environment variables were not set:\n${result.errors.join('\n')}`);
  }

  return result.environment;
};

const APP_ENVIRONMENT = validateEnv();

export const isProduction =
  !APP_ENVIRONMENT.ENVIRONMENT_MODE ||
  APP_ENVIRONMENT.ENVIRONMENT_MODE.toLowerCase() === 'production';

export default APP_ENVIRONMENT;
