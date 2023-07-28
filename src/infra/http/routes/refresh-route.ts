import { Request, Response } from 'express';

export async function refreshRoute(req: Request, res: Response) {
  const userId = req.body.userId;
  const refreshToken = req.cookies.refreshToken;

  res.json({
    message: `invalidating token ${refreshToken} from userid ${userId}`,
  });
}
