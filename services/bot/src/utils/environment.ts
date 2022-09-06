type OptionalEnvironment<K extends string> = Record<K, string | undefined>;
type RequiredEnvironment<K extends string> = Record<K, string>;

type GenerateEnvironment<
  RequiredEnv extends string,
  OptionalEnv extends string,
  > = RequiredEnvironment<RequiredEnv> & OptionalEnvironment<OptionalEnv>;

export const generateEnvironment = <
  RequiredEnv extends string,
  OptionalEnv extends string,
  >(
  requiredEnv: RequiredEnv[],
  optionalEnv: OptionalEnv[],
): GenerateEnvironment<RequiredEnv, OptionalEnv> => {
  const req = requiredEnv.reduce((env, envVar) => {
    const value = process.env[envVar];
    if (!value) {
      // eslint-disable-next-line no-console
      console.error(
        `Environment config not properly set. Expecting ${envVar}.`,
      );
      process.exit(1);
    }
    return {
      ...env,
      [envVar]: value,
    };
  }, {} as RequiredEnvironment<RequiredEnv>);

  const opt = optionalEnv.reduce((env, envVar) => {
    const value = process.env[envVar];
    if (!value) {
      return env;
    }
    return {
      ...env,
      [envVar]: value,
    };
  }, {} as OptionalEnvironment<OptionalEnv>);

  return { ...req, ...opt };
};


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
