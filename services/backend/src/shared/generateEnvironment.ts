import * as dotenv from 'dotenv';

dotenv.config();

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

export default generateEnvironment;
