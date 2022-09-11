import { RequestHandler } from 'express';
import jwt from 'jsonwebtoken';
import environment from '@util/environment';
import { getRepository } from 'typeorm';
import User from '@entities/User';
import { generateJwtPayload } from '@util/jwt';
import { DiscordJwtPayload, JwtPayload } from '../apiTypes';

interface AppCookies {
  token?: string;
}

export const withJwtAuth: RequestHandler = (req, res, next) => {
  const { token } = req.cookies as AppCookies;

  if (!token) {
    return res.status(401).send('No token');
  }

  return jwt.verify(token, environment.JWT_SECRET, (e, payload) => {
    if (e) {
      return res.status(401).send(e);
    }

    if (!payload) {
      return res.status(401).send('Invalid token');
    }

    req.jwtPayload = payload as JwtPayload;
    return next();
  });
};

export const withBotJwtAuth: RequestHandler = (req, res, next) => {
  const bearerHeader = req.header('authorization');

  if (!bearerHeader) {
    return res.status(401).send('No token');
  }

  const token = bearerHeader.replace(/^Bearer /, '');

  return jwt.verify(token, environment.DISCORD_JWT_SECRET, (e, payload) => {
    if (e) {
      return res.status(401).send(e);
    }

    if (!payload) {
      return res.status(401).send('Invalid token');
    }

    req.botJwtPayload = payload as DiscordJwtPayload;
    return next();
  });
};

export const withBotAuth: RequestHandler = (req, res, next) => {
  const bearerHeader = req.header('authorization');

  if (!bearerHeader) {
    return res.status(401).send('No token');
  }

  const token = bearerHeader.replace(/^Bearer /, '');
  const userRepo = getRepository(User);

  return jwt.verify(
    token,
    environment.DISCORD_BOT_JWT_SECRET,
    async (e, payload) => {
      if (e) {
        return res.status(401).send(e);
      }

      if (!payload) {
        return res.status(401).send('Invalid token');
      }

      const { id } = payload as DiscordJwtPayload;

      const user = await userRepo.findOne({ foreignId: id });

      if (!user) {
        return res.status(401).send('User does not exist');
      }

      req.jwtPayload = generateJwtPayload(user.id);
      return next();
    },
  );
};

export default withJwtAuth;
