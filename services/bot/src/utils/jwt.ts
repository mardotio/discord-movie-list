import jwt from 'jsonwebtoken';
import { BOT_ENVIRONMENT } from './environment';

const SECONDS_IN_MINUTE = 60;
const EXPIRATION_IN_SECONDS = SECONDS_IN_MINUTE * 2;

type DiscordJwtCreateRequest = Omit<DiscordJwtPayload, 'exp' | 'iat'>;

export interface DiscordJwtPayload {
  username: string;
  discriminator: string;
  nickname: string | null;
  avatarId: string | null;
  id: string;
  iat: number;
  exp: number;
}

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
