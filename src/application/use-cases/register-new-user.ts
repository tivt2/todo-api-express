import { TUser } from '../../domain/entity/user';
import { IPasswordEncrypter } from '../../domain/interface/password-encrypter-interface';
import { IUserRepository } from '../../domain/interface/user-respository-interface';

export class RegisterNewUser {
  constructor(
    private userRepo: IUserRepository,
    private passwordEncrypter: IPasswordEncrypter,
  ) {}

  async register(username: string, password: string): Promise<TUser> {
    const hashedPassword = await this.passwordEncrypter.hashPassword(password);

    const user = await this.userRepo.createUser(username, hashedPassword);
    return user;
  }
}
