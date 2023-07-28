import { Request, Response } from 'express';
import { refreshTokenStorage } from '../../utils/refresh-token-storage';

export async function refreshRoute(req: Request, res: Response) {
  const userId = req.body.userId;
  const refreshToken = req.cookies.refreshToken;

  const refreshManager = refreshTokenStorage();
  const stored = refreshManager.get(userId);
  console.log(stored?.token === refreshToken);

  res.json({
    message: `invalidating token ${refreshToken} from userid ${userId}`,
  });
}
