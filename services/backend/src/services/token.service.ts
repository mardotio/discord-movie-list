import { Request, Response } from 'express';
import { generateJwt } from '@util/jwt';
import prismaClient from '@util/prisma';
import { Prisma } from '@prisma/client';
import { createTokenResponse } from 'apiTypes';

const sendToken = (res: Response, user: NonNullable<Prisma.PromiseReturnType<typeof getUserByDiscordId>>, servers: string[]) => {
  const jwt = generateJwt(user.id, servers);

  if (!jwt) {
    return res.status(500).json({ error: "Could not generate JWT" });
  }

  const { token, payload } = jwt;

  res.cookie('token', token, {
    sameSite: 'strict',
    httpOnly: true,
    maxAge: payload.exp - payload.iat,
  });

  const response = createTokenResponse.safeParse(payload);

  if (response.success === true) {
    return res.status(200).json(response.data);
  }

  return res.status(500).json(response.error);
};

const getUserByDiscordId = async (id: string) =>
  prismaClient.user.findUnique({ where: { foreignId: id }});


const getServerbyId = async (id: string) =>
  prismaClient.server.findUnique({ where: { foreignId: id }});

const createToken = async (req: Request, res: Response) => {
  const { id, username, nickname, avatarId, serverId, serverName, serverIconId } = req.botJwtPayload;

  const server = await getServerbyId(serverId) || await prismaClient.server.create({ data: {
    name: serverName,
    foreignId: serverId,
    iconId: serverIconId,
    users: {
      create: [
        {
          userNickname: nickname,
          user: {
            connectOrCreate: {
              where: { foreignId: id },
              create: {
                foreignId: id,
                username,
                avatarId,
              }
            },
          }
        }
      ]
    }
  }});

  const user = await prismaClient.user.upsert({ 
    where: { foreignId: id },
    include: { servers: { where: { serverId: server.id }} },
    update: {
      username,
      avatarId,
    },
    create: {
      foreignId: id,
      username,
      avatarId,
      servers: {
        create: [
          {
            userNickname: nickname,
            server: {
              connect: {
                id: server.id
              }
            }
          }
        ]
      }
    }
  });

  if (server.name !== serverName || user.servers[0].userNickname !== nickname) {
    await prismaClient.server.update({
      where: {id: server.id},
      data: {
        name: serverName,
        users: {
          update: {
            where: {
              userId_serverId: { serverId: server.id, userId: user.id }
            },
            data: { userNickname: nickname }
          }
        }
      }
    });
  }

  return sendToken(res, user, user.servers.map((server) => server.serverId));
};

export default createToken;
