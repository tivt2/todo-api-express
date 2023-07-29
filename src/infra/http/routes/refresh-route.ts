import { Request, Response } from 'express';
import { RefreshRepository } from '../../db/refresh-repository';
import { TokenManager } from '../../utils/token-manager';
import { RefreshStorage } from '../../utils/refresh-storage';

export const refreshRoute =
  (
    refreshRepository: RefreshRepository,
    refreshManager: TokenManager,
    accessManager: TokenManager,
    refreshStorage: RefreshStorage,
  ) =>
  async (req: Request, res: Response) => {
    const userId = req.body.userId;
    const refreshToken = req.cookies.refreshToken;

    try {
      const stored = refreshStorage.getToken(userId);
      if (!stored) {
        res.status(403);
        res.json({ message: 'Invalid token' });
        return;
      }

      if (stored.token !== refreshToken) {
        const isInvalidToken = await refreshRepository.findToken(
          userId,
          refreshToken,
        );
        if (isInvalidToken) {
          res.status(403);
          res.json({ message: 'Eat shit attacker' });
          return;
        }

        res.status(403);
        res.json({ message: 'Invalid token' });
        return;
      }

      try {
        //needs sometype of buffer to deal with high rate insert to DB
        await refreshRepository.insert(userId, refreshToken);
      } catch (err) {
        res.status(500);
        res.json({
          message: 'Something wrong happen, please try again in a moment',
        });
        return;
      }

      const newRefreshToken = await refreshManager.generate(userId);
      refreshStorage.setToken(userId, {
        token: newRefreshToken,
        createdAt: new Date(),
      });

      const newAccessToken = await accessManager.generate(userId);

      res.status(200);
      res.cookie('refreshToken', newRefreshToken, { httpOnly: true });
      res.json({ accessToken: newAccessToken });
    } catch (err) {
      res.status(500);
      res.json({
        message: 'Something wrong happen, please try again in a moment',
      });
    }
  };
