import { TUser } from '../entity/user';

export interface IUserRepository {
  insert(username: string, hashedPassword: string): Promise<TUser>;
  getUserByUsername(username: string): Promise<TUser | undefined>;
}
