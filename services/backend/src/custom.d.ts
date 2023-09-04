declare namespace Express {
  export interface Request {
    jwtPayload: import('./apiTypes/token').UIJWTPayload;
    botJwtPayload: import('./apiTypes/token').DiscordJWTPayload;
  }
}
