import { Request, Response } from 'express';
import { InvalidCredentialsError } from '../../../application/errors/invalid-credential-error';
import { LoginUser } from '../../../application/use-cases/login-user';
import { RegisterNewUser } from '../../../application/use-cases/register-new-user';
import { DuplicatedUserError } from '../../errors/duplicated-user-error';
import { UserNotFoundError } from '../../errors/user-not-found-error';
import { UserInputValidator } from '../../utils/user-input-validator';
import { RefreshRepository } from '../../db/refresh-repository';
import { RefreshStorage } from '../../utils/refresh-storage';
import { TokenManager } from '../../utils/token-manager';

export function loginRoute(
  userInputValidator: UserInputValidator,
  loginUser: LoginUser,
) {
  return async function (req: Request, res: Response) {
    const { username, password } = req.body;

    const isValid = userInputValidator.isValid(username, password);
    try {
      if (!isValid) {
        res.status(401);
        res.json({
          message: 'Invalid credentials',
        });
        return;
      }

      const { accessToken, refreshToken } = await loginUser.login(
        username,
        password,
      );

      res.status(200);
      res.cookie('refreshToken', refreshToken, { httpOnly: true });
      res.json({ accessToken });
    } catch (err) {
      if (
        err instanceof InvalidCredentialsError ||
        err instanceof UserNotFoundError
      ) {
        res.status(401);
        res.json({ message: 'Invalid credentials' });
        return;
      }
      res.status(500);
      res.json({
        message: 'Something wrong happen, please try again in a moment',
      });
    }
  };
}

export function logoutRoute(
  refreshRepository: RefreshRepository,
  refreshStorage: RefreshStorage,
) {
  return async function (req: Request, res: Response) {
    const userId = req.body.userId;
    const refreshToken = req.cookies.refreshToken;

    try {
      const stored = refreshStorage.removeToken(userId);
      if (!stored) {
        res.status(400);
        res.json({ message: 'Invalid request' });
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

        res.status(400);
        res.json({ message: 'Invalid request' });
        return;
      }

      await refreshRepository.insert(userId, refreshToken);

      res.status(200);
      res.json({ message: 'See you next time' });
    } catch (err) {
      res.status(500);
      res.json({
        message: 'Something wrong happen, please try again in a moment',
      });
    }
  };
}

export const registerRoute =
  (userInputValidator: UserInputValidator, registerNewUser: RegisterNewUser) =>
  async (req: Request, res: Response) => {
    const { username, password } = req.body;

    const isValid = userInputValidator.isValid(username, password);
    try {
      if (!isValid) {
        res.status(400);
        res.json({
          message:
            'Invalid user data, please provide a username with 3 characters and a password with 1 lower 1 upper 1 number and 1 special character and minimun 6 characters',
        });
        return;
      }

      const user = await registerNewUser.register(username, password);
      res.status(200);
      res.json({ message: `Welcome ${user.username}, enjoy` });
      return res;
    } catch (err) {
      if (
        typeof err === 'object' &&
        (err as DuplicatedUserError).code === 11000
      ) {
        res.status(409);
        res.json({
          message: 'User already exists',
        });
        return;
      }
      res.status(500);
      res.json({
        message: 'Something wrong happen, please try again in a moment',
      });
      return;
    }
  };

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

      //needs sometype of buffer to deal with high rate insert to DB
      await refreshRepository.insert(userId, refreshToken);

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
