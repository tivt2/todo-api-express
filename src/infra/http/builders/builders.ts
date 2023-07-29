import { LoginUser } from '../../../application/use-cases/login-user';
import { RegisterNewUser } from '../../../application/use-cases/register-new-user';
import { RefreshRepository } from '../../db/refresh-repository';
import { UserRepository } from '../../db/user-repository';
import { RefreshTokenMap } from '../../utils/data-structure/refresh-token-map';
import { PasswordEncrypter } from '../../utils/password-encrypter';
import { TokenManager } from '../../utils/token-manager';
import { UserInputValidator } from '../../utils/user-input-validator';

export const buildUserInputValidator = (function initializer() {
  let userInputValidator: UserInputValidator | undefined;

  return function (): UserInputValidator {
    if (!userInputValidator) {
      userInputValidator = new UserInputValidator();
      return userInputValidator;
    }

    return userInputValidator;
  };
})();

export const buildAccessManager = (function initializer() {
  let accessManagerSingleton: TokenManager | undefined;

  return function (): TokenManager {
    if (!accessManagerSingleton) {
      const fiveMinutesInSeconds = 60 * 5;
      accessManagerSingleton = new TokenManager(
        process.env.JWT_ACCESS_SECRET as string,
        fiveMinutesInSeconds,
      );
      return accessManagerSingleton;
    }

    return accessManagerSingleton;
  };
})();

export const buildRefreshManager = (function initializer() {
  let refreshManagerSingleton: TokenManager | undefined;

  return function (): TokenManager {
    if (!refreshManagerSingleton) {
      const oneDayInSeconds = 60 * 60 * 24;
      refreshManagerSingleton = new TokenManager(
        process.env.JWT_REFRESH_SECRET as string,
        oneDayInSeconds,
      );
      return refreshManagerSingleton;
    }

    return refreshManagerSingleton;
  };
})();

export const buildRefreshStorage = (function initializer() {
  let refreshStorageSingleton: RefreshTokenMap | undefined;

  return function (): RefreshTokenMap {
    if (!refreshStorageSingleton) {
      refreshStorageSingleton = new RefreshTokenMap();
    }

    return refreshStorageSingleton;
  };
})();

export const buildRefreshRepository = (function initializer() {
  let refreshRepositorySingleton: RefreshRepository | undefined;

  return function (): RefreshRepository {
    if (!refreshRepositorySingleton) {
      refreshRepositorySingleton = new RefreshRepository();
      return refreshRepositorySingleton;
    }

    return refreshRepositorySingleton;
  };
})();

export const buildUserRepository = (function initializer() {
  let userRepositorySingleton: UserRepository | undefined;

  return function (): UserRepository {
    if (!userRepositorySingleton) {
      userRepositorySingleton = new UserRepository();
      return userRepositorySingleton;
    }

    return userRepositorySingleton;
  };
})();

export const buildPasswordEncrypter = (function initializer() {
  let passwordEncrypterSingleton: PasswordEncrypter | undefined;

  return function (): PasswordEncrypter {
    if (!passwordEncrypterSingleton) {
      passwordEncrypterSingleton = new PasswordEncrypter();
      return passwordEncrypterSingleton;
    }

    return passwordEncrypterSingleton;
  };
})();

export const buildLoginUser = (function initializer() {
  let loginUserSingleton: LoginUser | undefined;

  return function (): LoginUser {
    if (!loginUserSingleton) {
      loginUserSingleton = new LoginUser(
        buildUserRepository(),
        buildAccessManager(),
        buildRefreshManager(),
        buildRefreshStorage(),
        buildPasswordEncrypter(),
      );
      return loginUserSingleton;
    }

    return loginUserSingleton;
  };
})();

export const buildRegisterNewUser = (function initializer() {
  let registerNewUserSingleton: RegisterNewUser | undefined;

  return function (): RegisterNewUser {
    if (!registerNewUserSingleton) {
      registerNewUserSingleton = new RegisterNewUser(
        buildUserRepository(),
        buildPasswordEncrypter(),
      );
      return registerNewUserSingleton;
    }

    return registerNewUserSingleton;
  };
})();
