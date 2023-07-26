import { TUser } from '../domain/entity/user';
import { IUserRepository } from '../domain/interface/user-respository-interface';
import crypto from 'crypto';

export class UserRepositorySpy implements IUserRepository {
  repo: TUser[] = [];
  username = '';

  async insert(username: string, hashedPassword: string): Promise<TUser> {
    const user = {
      id: crypto.randomUUID(),
      username,
      hashedPassword,
      createdAt: new Date(),
    };

    this.repo.push(user);

    return new Promise((resolve) => resolve(user));
  }

  async getUserByUsername(username: string): Promise<TUser | undefined> {
    this.username = username;
    const user = this.repo.find((user) => user.username === username);
    return new Promise((resolve) => {
      resolve(user);
    });
  }
}
