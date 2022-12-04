import jwt from 'jsonwebtoken';
import { BOT_ENVIRONMENT } from './environment';
import { DiscordJwtPayload } from '@mardotio/api-types';

const SECONDS_IN_MINUTE = 60;
const EXPIRATION_IN_SECONDS = SECONDS_IN_MINUTE * 2;

type DiscordJwtCreateRequest = Omit<DiscordJwtPayload, 'exp' | 'iat'>;

const getJwtPayload = (user: DiscordJwtCreateRequest): DiscordJwtPayload => {
  const iat = Math.floor(Date.now() / 1000);
  return {
    ...user,
    iat,
    exp: iat + EXPIRATION_IN_SECONDS,
  };
};

export const generateLoginJwt = (user: DiscordJwtCreateRequest) =>
  jwt.sign(getJwtPayload(user), BOT_ENVIRONMENT.DISCORD_JWT_SECRET);

export const generateBotJwt = (user: DiscordJwtCreateRequest) =>
  jwt.sign(getJwtPayload(user), BOT_ENVIRONMENT.DISCORD_BOT_JWT_SECRET);
