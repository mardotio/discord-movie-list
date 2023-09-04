import { RequestHandler } from 'express';
import jwt from 'jsonwebtoken';
import environment from '@util/environment';
import { generateJwtPayload } from '@util/jwt';
import prismaClient from '@util/prisma';
import { discordJWTPaylod, uiJWTPayload } from 'apiTypes';

interface AppCookies {
  token?: string;
}

export const withJwtAuth: RequestHandler = (req, res, next) => {
  const { token } = req.cookies as AppCookies;

  if (!token) {
    return res.status(401).json({ error: 'Missing token.' });
  }

  return jwt.verify(token, environment.JWT_SECRET, (e, payload) => {
    if (e) {
      return res.status(401).send(e);
    }

    const jwtPayload = uiJWTPayload.safeParse(payload);

    if (!jwtPayload.success) {
      return res.status(401).json({ error: 'Invalid token.' });
    }

    req.jwtPayload = jwtPayload.data;
    return next();
  });
};

export const withBotJwtAuth: RequestHandler = (req, res, next) => {
  const bearerHeader = req.header('authorization');

  if (!bearerHeader) {
    return res.status(401).json({ error: 'Missing token.' });
  }

  const token = bearerHeader.replace(/^Bearer /, '');

  return jwt.verify(token, environment.DISCORD_JWT_SECRET, (e, payload) => {
    if (e) {
      return res.status(401).send(e);
    }

    const jwtPayload = discordJWTPaylod.safeParse(payload);

    if (!jwtPayload.success) {
      return res.status(401).json({ error: "Invalid token." });
    }

    req.botJwtPayload = jwtPayload.data;
    return next();
  });
};

export const withBotAuth: RequestHandler = (req, res, next) => {
  const bearerHeader = req.header('authorization');

  if (!bearerHeader) {
    return res.status(401).json({ error: 'Missing token.' });
  }

  const token = bearerHeader.replace(/^Bearer /, '');

  return jwt.verify(
    token,
    environment.DISCORD_BOT_JWT_SECRET,
    async (e, payload) => {
      if (e) {
        return res.status(401).send(e);
      }

      const jwtPayload = discordJWTPaylod.safeParse(payload);

      if (!jwtPayload.success) {
        return res.status(401).json({ error: "Invalid token." });
      }

      const { id } = jwtPayload.data;

      const user = await prismaClient.user.findFirst({ where: { foreignId: id }, include: { servers: true } });

      if (!user) {
        return res.status(401).json({ error: 'Found a ghost.' });
      }

      if (user.servers.length <= 0) {
        return res.status(401).send({ error: "You don't have access to any servers." });
      }

      const internalJwt = generateJwtPayload(user.id, user.servers.map((server) => server.serverId));

      if (!internalJwt) {
        return res.status(401).json({ error: "Could not generate token" });
      }

      req.jwtPayload = internalJwt
      return next();
    },
  );
};

export default withJwtAuth;
