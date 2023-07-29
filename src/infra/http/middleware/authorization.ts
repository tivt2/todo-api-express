import { Request, Response, NextFunction } from 'express';
import { InvalidTokenError } from '../../utils/error/invalid-token-error';
import { TokenManager } from '../../utils/token-manager';

export const authorization =
  (tokenManager: TokenManager) =>
  async (req: Request, res: Response, next: NextFunction) => {
    const bearer = req.headers.authorization;

    if (!bearer) {
      res.status(401);
      res.json({ message: 'Unauthorized' });
      return;
    }

    const [authContext, token] = bearer.split(' ');
    if (!token || authContext !== 'Bearer') {
      res.status(401);
      res.json({ message: 'Unauthorized' });
      return;
    }

    try {
      const userId = await tokenManager.validate(token);
      req.body.userId = userId;
      next();
    } catch (err) {
      if (err instanceof InvalidTokenError) {
        res.status(403);
        res.json({ message: 'Invalid token' });
        return;
      }
      res.status(500);
      res.json({
        message: 'Something wrong happen, please try again in a moment',
      });
    }
  };
