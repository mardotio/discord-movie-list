import User from '@entities/User';

// eslint-disable-next-line import/prefer-default-export
export const getAvatarUrl = ({ foreignId, avatarId }: User) => {
  if (!avatarId) {
    return null;
  }

  return `https://cdn.discordapp.com/avatars/${foreignId}/${avatarId}.png`;
};
