import { z } from 'zod';

export const getCurrentUserResponse = z.object({
  id: z.string(),
  username: z.string(),
  avatarLink: z.string().url().nullable(),
  servers: z.array(z.object({
    id: z.string(),
    name: z.string(),
    iconLink: z.string().url().nullable(),
    userDisplayName: z.string(),
  })),
});
export type GetCurrentUserResponse = z.infer<typeof getCurrentUserResponse>;
