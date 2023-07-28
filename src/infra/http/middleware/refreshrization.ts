import { Request, Response, NextFunction } from 'express';
import { ITokenManager } from '../../../domain/interface/token-manager-interface';
import { InvalidTokenError } from '../../utils/error/invalid-token-error';

export const refreshrization =
  (tokenManager: ITokenManager) =>
  async (req: Request, res: Response, next: NextFunction) => {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      res.status(401);
      res.json({ message: 'Unauthorized' });
      return;
    }

    try {
      const userId = await tokenManager.validate(refreshToken);
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
