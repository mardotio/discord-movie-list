// eslint-disable-next-line import/prefer-default-export
export const getAvatarUrl = <T extends { foreignId: string; avatarId: string | null}>({ foreignId, avatarId }: T) => {
  if (!avatarId) {
    return null;
  }

  return `https://cdn.discordapp.com/avatars/${foreignId}/${avatarId}.png`;
};

export const getIconUrl = <T extends { foreignId: string; iconId: string | null}>({ foreignId, iconId }: T) => {
  if (!iconId) {
    return null;
  }

  return `https://cdn.discordapp.com/icons/${foreignId}/${iconId}.png`;
};
