import jwt from 'jsonwebtoken';
import APP_ENVIRONMENT from '@util/environment';
import { CreateTokenResponse, UIJWTPayload, uiJWTPayload } from '../apiTypes';

const SECONDS_IN_MINUTE = 60;
const EXPIRATION_IN_SECONDS = SECONDS_IN_MINUTE * 10;

const jwtPayloadToResponse = ({ iat, exp }: UIJWTPayload): CreateTokenResponse => ({
  iat: iat * 1000,
  exp: exp * 1000,
});

export const generateJwtPayload = (userId: string, servers: string[]) => {
  const iat = Math.floor(Date.now() / 1000);
  const payload = uiJWTPayload.safeParse({
    id: userId,
    servers,
    iat,
    exp: iat + EXPIRATION_IN_SECONDS,
  })

  if (payload.success) {
    return payload.data;
  }

  return null;
};

// eslint-disable-next-line import/prefer-default-export
export const generateJwt = (
  userId: string,
  servers: string[],
): { token: string; payload: CreateTokenResponse } | null => {
  const jwtPayload = generateJwtPayload(userId, servers);

  if (!jwtPayload) {
    return null;
  }

  const token = jwt.sign(jwtPayload, APP_ENVIRONMENT.JWT_SECRET);

  return { token, payload: jwtPayloadToResponse(jwtPayload) };
};
