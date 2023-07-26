import { TUser } from '../entity/user';

export interface IUserRepository {
  insert(username: string, password: string): Promise<TUser>;
  getUserByUsername(username: string): Promise<TUser | null>;
}
