import { TUser } from '../entity/user';

export interface IUserRepository {
  createUser(username: string, password: string): Promise<TUser>;
  getUserByUsername(username: string): Promise<TUser>;
}
