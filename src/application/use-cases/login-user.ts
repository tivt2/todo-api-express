import { IPasswordEncrypter } from '../../domain/interface/password-encrypter-interface';
import { ITokenManager } from '../../domain/interface/token-manager-interface';
import { IUserRepository } from '../../domain/interface/user-respository-interface';
import { InvalidCredentialsError } from '../errors/invalid-credential-error';

export class LoginUser {
  constructor(
    private userRepo: IUserRepository,
    private tokenManager: ITokenManager,
    private passwordEncrypter: IPasswordEncrypter,
  ) {}

  async login(username: string, password: string) {
    const user = await this.userRepo.getUser(username);

    const matchPassword = this.passwordEncrypter.compare(
      password,
      user.hashedPassword,
    );
    if (!matchPassword) {
      throw new InvalidCredentialsError();
    }

    const token = await this.tokenManager.generate(user.id);
    return token;
  }
}
