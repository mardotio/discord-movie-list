import { getAvatarUrl, getIconUrl } from '@util/discord';
import { withUIJWT } from '@util/handlers';
import prismaClient from '@util/prisma';
import { sendResponse } from '@util/responses/helper';
import { GetCurrentUserResponse, getCurrentUserResponse } from 'apiTypes';

export const getCurrentUser = withUIJWT(async ({ res, jwt }) => {
  const { id } = jwt;

  const user = await prismaClient.user.findUnique({ where: { id }, include: { servers: { include: { server: true }} }});

  if (!user) {
    return res.status(404).json({ error: 'You are a ghost.' });
  }

  const responseData: GetCurrentUserResponse = {
    id: user.id,
    username: user.username,
    avatarLink: getAvatarUrl(user),
    servers: user.servers.map(({ server, userNickname }) => ({
      id: server.id,
      iconLink: getIconUrl(server),
      name: server.name,
      userDisplayName: userNickname || user.username,
    })),
  };

  return sendResponse({ res, data: getCurrentUserResponse.safeParse(responseData) });
});
