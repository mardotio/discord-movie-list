import jwt from 'jsonwebtoken';
import APP_ENVIRONMENT from '@util/environment';
import { JwtPayload, TokenResponse } from '../apiTypes';

const SECONDS_IN_MINUTE = 60;
const EXPIRATION_IN_SECONDS = SECONDS_IN_MINUTE * 10;

const jwtPayloadToResponse = ({ iat, exp }: JwtPayload): TokenResponse => ({
  iat: iat * 1000,
  exp: exp * 1000,
});

export const generateJwtPayload = (userId: string) => {
  const iat = Math.floor(Date.now() / 1000);
  const jwtPayload: JwtPayload = {
    id: userId,
    iat,
    exp: iat + EXPIRATION_IN_SECONDS,
  };
  return jwtPayload;
};

// eslint-disable-next-line import/prefer-default-export
export const generateJwt = (
  userId: string,
): { token: string; payload: TokenResponse } => {
  const jwtPayload = generateJwtPayload(userId);
  const token = jwt.sign(jwtPayload, APP_ENVIRONMENT.JWT_SECRET);

  return { token, payload: jwtPayloadToResponse(jwtPayload) };
};
