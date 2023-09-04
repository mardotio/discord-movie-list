import { z } from 'zod';

export const createTokenResponse = z.object({
  iat: z.number(),
  exp: z.number(),
});
export type CreateTokenResponse = z.infer<typeof createTokenResponse>;

export const discordJWTPaylod = z.object({
  username: z.string(),
  serverId: z.string(),
  serverName: z.string(),
  nickname: z.string().nullable(),
  avatarId: z.string().nullable(),
  serverIconId: z.string().nullable(),
  id: z.string(),
  iat: z.number(),
  exp: z.number(),
});
export type DiscordJWTPayload = z.infer<typeof discordJWTPaylod>;

export const uiJWTPayload = z.object({
  id: z.string(),
  iat: z.number(),
  exp: z.number(),
  servers: z.array(z.string()),
});
export type UIJWTPayload = z.infer<typeof uiJWTPayload>;
