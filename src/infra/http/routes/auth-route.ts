import { InvalidCredentialsError } from '../../../application/errors/invalid-credential-error';
import { IUserInputValidator } from '../../../domain/interface/user-input-validator-interface';
import { Request, Response } from 'express';
import { UserRepository } from '../../db/user-repository';
import { TokenManager } from '../../utils/token-manager';
import { PasswordEncrypter } from '../../utils/password-encrypter';
import { LoginUser } from '../../../application/use-cases/login-user';
import { RegisterNewUser } from '../../../application/use-cases/register-new-user';
import { DuplicatedUserError } from '../../errors/duplicated-user-error';
import { UserNotFoundError } from '../../errors/user-not-found-error';

export const loginRoute =
  (userInputValidator: IUserInputValidator) =>
  async (req: Request, res: Response) => {
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

      const userRepository = new UserRepository();
      const tokenManager = new TokenManager();
      const passwordEncrypter = new PasswordEncrypter();
      const loginUser = new LoginUser(
        userRepository,
        tokenManager,
        passwordEncrypter,
      );

      const token = await loginUser.login(username, password);
      res.status(200);
      res.json({ token });
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

export const registerRoute =
  (userInputValidator: IUserInputValidator) =>
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

      const userRepository = new UserRepository();
      const passwordEncrypter = new PasswordEncrypter();
      const registerNewUser = new RegisterNewUser(
        userRepository,
        passwordEncrypter,
      );

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
