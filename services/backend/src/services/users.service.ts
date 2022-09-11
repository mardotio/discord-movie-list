import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import User from '@entities/User';
import { getAvatarUrl } from '@util/discord';
import { UserResponse } from '../apiTypes';

const toUserResponse = (user: User): UserResponse => ({
  id: user.id,
  username: user.username,
  usernameId: user.usernameId,
  nickname: user.nickname || null,
  avatarLink: getAvatarUrl(user),
});

// eslint-disable-next-line import/prefer-default-export
export const getCurrentUser = async (req: Request, res: Response) => {
  const userRepo = getRepository(User);
  const { id } = req.jwtPayload;
  const user = await userRepo.findOne(id);

  if (!user) {
    return res
      .status(404)
      .json({ errors: { message: `Could not find user by ID ${id}` } });
  }

  return res.status(200).json(toUserResponse(user));
};
