export interface TokenResponse {
  iat: number;
  exp: number;
}

export interface DiscordJwtPayload {
  username: string;
  discriminator: string;
  nickname: string | null;
  avatarId: string | null;
  id: string;
  iat: number;
  exp: number;
}

export interface JwtPayload {
  id: string;
  iat: number;
  exp: number;
}
