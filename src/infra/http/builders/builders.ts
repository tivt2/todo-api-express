import { CreateNewTodo } from '../../../application/use-cases/create-new-todo';
import { DeleteTodo } from '../../../application/use-cases/delete-todo';
import { EditTodo } from '../../../application/use-cases/edit-todo';
import { LoginUser } from '../../../application/use-cases/login-user';
import { MoveTodo } from '../../../application/use-cases/move-todo';
import { RegisterNewUser } from '../../../application/use-cases/register-new-user';
import { TodoList } from '../../../application/use-cases/todo-list';
import { RefreshRepository } from '../../db/refresh-repository';
import { TodoRepository } from '../../db/todo-repository';
import { UserRepository } from '../../db/user-repository';
import { PasswordEncrypter } from '../../utils/password-encrypter';
import { RefreshStorage } from '../../utils/refresh-storage';
import { TokenManager } from '../../utils/token-manager';
import { UserInputValidator } from '../../utils/user-input-validator';

const ACCESS_EXPIRES_IN_SEC = 60 * 5; // FIVE MINUTES IN SECONDS

const REFRESH_EXPIRES_IN_S = 60 * 60 * 24; // ONE DAY IN SECONDS
const REFRESH_EXPIRES_IN_MS = REFRESH_EXPIRES_IN_S * 1000; // ONE DAY IN MILLISECONDS
const REFRESH_INTERVAL_TO_CLEAR_DB_IN_MS = 1000 * 60 * 60; // ONE HOUR IN MILLISECONDS

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
        ACCESS_EXPIRES_IN_SEC,
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
        REFRESH_EXPIRES_IN_S,
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
      refreshRepositorySingleton = new RefreshRepository(
        REFRESH_EXPIRES_IN_MS,
        REFRESH_INTERVAL_TO_CLEAR_DB_IN_MS,
      );
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

export const buildTodoRepository = (function initializer() {
  let todoRepositorySingleton: TodoRepository | undefined;

  return function (): TodoRepository {
    if (!todoRepositorySingleton) {
      todoRepositorySingleton = new TodoRepository();
      return todoRepositorySingleton;
    }

    return todoRepositorySingleton;
  };
})();

export const buildTodoList = (function initializer() {
  let todoListSingleton: TodoList | undefined;

  return function (): TodoList {
    if (!todoListSingleton) {
      todoListSingleton = new TodoList(buildTodoRepository());
      return todoListSingleton;
    }

    return todoListSingleton;
  };
})();

export const buildCreateNewTodo = (function initializer() {
  let createNewTodoSingleton: CreateNewTodo | undefined;

  return function (): CreateNewTodo {
    if (!createNewTodoSingleton) {
      createNewTodoSingleton = new CreateNewTodo(buildTodoRepository());
      return createNewTodoSingleton;
    }

    return createNewTodoSingleton;
  };
})();

export const buildEditTodo = (function initializer() {
  let editTodoSingleton: EditTodo | undefined;

  return function (): EditTodo {
    if (!editTodoSingleton) {
      editTodoSingleton = new EditTodo(buildTodoRepository());
      return editTodoSingleton;
    }

    return editTodoSingleton;
  };
})();

export const buildMoveTodo = (function initializer() {
  let moveTodoSingleton: MoveTodo | undefined;

  return function (): MoveTodo {
    if (!moveTodoSingleton) {
      moveTodoSingleton = new MoveTodo(buildTodoRepository());
      return moveTodoSingleton;
    }

    return moveTodoSingleton;
  };
})();

export const buildDeleteTodo = (function initializer() {
  let deleteTodoSingleton: DeleteTodo | undefined;

  return function (): DeleteTodo {
    if (!deleteTodoSingleton) {
      deleteTodoSingleton = new DeleteTodo(buildTodoRepository());
      return deleteTodoSingleton;
    }

    return deleteTodoSingleton;
  };
})();
