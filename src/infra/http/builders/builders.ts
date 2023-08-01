import { LoginUser } from '../../../application/use-cases/login-user';
import { RegisterNewUser } from '../../../application/use-cases/register-new-user';
import { RefreshRepository } from '../../db/refresh-repository';
import { UserRepository } from '../../db/user-repository';
import { PasswordEncrypter } from '../../utils/password-encrypter';
import { RefreshStorage } from '../../utils/refresh-storage';
import { TokenManager } from '../../utils/token-manager';
import { UserInputValidator } from '../../utils/user-input-validator';

const ACCESS_EXPIRES_IN_SEC = 60 * 5 // FIVE MINUTES IN SECONDS

const REFRESH_EXPIRES_IN_S = 60 * 60 * 24 // ONE DAY IN SECONDS
const REFRESH_EXPIRES_IN_MS = REFRESH_EXPIRES_IN_S * 1000 // ONE DAY IN MILLISECONDS
const REFRESH_INTERVAL_TO_CLEAR_DB_IN_MS = 1000 * 60 * 60 // ONE HOUR IN MILLISECONDS

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
      accessManagerSingleton = new TokenManager(
        process.env.JWT_ACCESS_SECRET as string,
        ACCESS_EXPIRES_IN_SEC
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
      refreshManagerSingleton = new TokenManager(
        process.env.JWT_REFRESH_SECRET as string,
        REFRESH_EXPIRES_IN_S
      );
      return refreshManagerSingleton;
    }

    return refreshManagerSingleton;
  };
})();

export const buildRefreshStorage = (function initializer() {
  let refreshStorageSingleton: RefreshStorage | undefined;

  return function (): RefreshStorage {
    if (!refreshStorageSingleton) {
      refreshStorageSingleton = new RefreshStorage(REFRESH_EXPIRES_IN_MS);
    }

    return refreshStorageSingleton;
  };
})();

export const buildRefreshRepository = (function initializer() {
  let refreshRepositorySingleton: RefreshRepository | undefined;

  return function (): RefreshRepository {
    if (!refreshRepositorySingleton) {
      refreshRepositorySingleton = new RefreshRepository(REFRESH_EXPIRES_IN_MS, REFRESH_INTERVAL_TO_CLEAR_DB_IN_MS)
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
