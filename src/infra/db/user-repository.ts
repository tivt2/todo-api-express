import { TUser } from '../../domain/entity/user';
import { IUserRepository } from '../../domain/interface/user-respository-interface';
import { UserNotFoundError } from '../errors/user-not-found-error';
import User from './mongo/models/user';

export class UserRepository implements IUserRepository {
  async insert(username: string, password: string): Promise<TUser> {
    const user = await User.create({ username, password });
    return user;
  }

  async getUserByUsername(username: string): Promise<TUser> {
    const user = await User.findOne({ username }).lean().exec();
    if (!user) {
      throw new UserNotFoundError();
    }
    return user;
  }
}
