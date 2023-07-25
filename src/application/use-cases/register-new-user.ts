import { TUser } from '../../domain/entity/user';
import { IUserRepository } from '../../domain/interface/user-respository-interface';

export class RegisterNewUser {
  constructor(private userRepo: IUserRepository) {}

  async register(username: string, password: string): Promise<TUser> {
    const user = await this.userRepo.insert(username, password);
    return user;
  }
}
