import { TUser } from '../entity/user';

export interface IUserRepository {
  insert(username: string, hashedPassword: string): Promise<TUser>;
  getUser(username: string): Promise<TUser | undefined>;
}
