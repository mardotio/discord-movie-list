import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import User from '@entities/User';
import { generateJwt } from '@util/jwt';

const sendToken = (res: Response, user: User) => {
  const { token, payload } = generateJwt(user.id);
  res.cookie('token', token, {
    sameSite: 'strict',
    httpOnly: true,
    maxAge: payload.exp - payload.iat,
  });
  return res.status(200).json(payload);
};

const createToken = async (req: Request, res: Response) => {
  const { id, discriminator, username, nickname, avatarId } = req.botJwtPayload;
  const userRepo = getRepository(User);
  const user = await userRepo.findOne({ foreignId: req.botJwtPayload.id });

  if (!user) {
    const newUser = await userRepo.save({
      ...new User(),
      foreignId: id,
      username,
      nickname,
      usernameId: discriminator,
      avatarId,
    });

    return sendToken(res, newUser);
  }

  if (
    user.usernameId !== discriminator ||
    user.username !== username ||
    user.nickname !== nickname ||
    user.avatarId !== avatarId
  ) {
    const updatedUser = await userRepo.save({
      id: user.id,
      username,
      usernameId: discriminator,
      nickname,
      avatarId,
    });
    return sendToken(res, updatedUser);
  }

  return sendToken(res, user);
};

export default createToken;
