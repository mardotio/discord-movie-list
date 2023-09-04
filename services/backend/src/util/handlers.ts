import { UIJWTPayload } from 'apiTypes';
import { Request, Response } from 'express';

export const withUIJWT = (handler: (params: { req: Request, res: Response, jwt: UIJWTPayload}) => void) =>
  (req: Request, res: Response) =>
    handler({ req, res, jwt: req.jwtPayload });
