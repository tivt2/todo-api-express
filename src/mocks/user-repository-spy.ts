import { TUser } from '../domain/entity/user';
import { IUserRepository } from '../domain/interface/user-respository-interface';
import crypto from 'crypto';
import { UserNotFoundError } from '../infra/errors/user-not-found-error';

export class UserRepositorySpy implements IUserRepository {
  repo: TUser[] = [];
  username = '';

  async createUser(username: string, password: string): Promise<TUser> {
    const user = {
      id: crypto.randomUUID(),
      username,
      password,
      todosOrder: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.repo.push(user);

    return new Promise((resolve) => resolve(user));
  }

  async getUserByUsername(username: string): Promise<TUser> {
    this.username = username;
    const user = this.repo.find((user) => user.username === username);
    if (!user) {
      throw new UserNotFoundError();
    }
    return user;
  }
}
