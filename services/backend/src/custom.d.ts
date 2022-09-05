declare namespace Express {
  export interface Request {
    jwtPayload: import('./shared/token').JwtPayload;
    botJwtPayload: import('./shared/token').DiscordJwtPayload;
  }
}
