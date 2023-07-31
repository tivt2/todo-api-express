import { TUser } from '../../domain/entity/user';
import { IUserRepository } from '../../domain/interface/user-respository-interface';
import { NewUserError } from '../errors/new-user-error';
import { UserNotFoundError } from '../errors/user-not-found-error';
import { findFirstUserByUsername } from './drizzle/queries/findFirstUserByUsername';
import { insertUser } from './drizzle/queries/insertUser';

export class UserRepository implements IUserRepository {
  async createUser(username: string, password: string): Promise<TUser> {
    const newUser = await insertUser({ username, password, todosOrder: [] });
    if (!newUser) {
      throw new NewUserError();
    }
    return newUser;
  }

  async getUserByUsername(username: string): Promise<TUser> {
    const user = await findFirstUserByUsername(username);
    if (!user) {
      throw new UserNotFoundError();
    }
    return user;
  }
}
