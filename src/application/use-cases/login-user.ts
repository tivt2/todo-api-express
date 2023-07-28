import { IPasswordEncrypter } from '../../domain/interface/password-encrypter-interface';
import { IRefreshStorage } from '../../domain/interface/refresh-storage-interface';
import { ITokenManager } from '../../domain/interface/token-manager-interface';
import { IUserRepository } from '../../domain/interface/user-respository-interface';
import { InvalidCredentialsError } from '../errors/invalid-credential-error';

export class LoginUser {
  constructor(
    private userRepo: IUserRepository,
    private tokenManager: ITokenManager,
    private refreshManager: ITokenManager,
    private refreshStorage: IRefreshStorage,
    private passwordEncrypter: IPasswordEncrypter,
  ) {}

  async login(
    username: string,
    password: string,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const user = await this.userRepo.getUserByUsername(username);

    const matchPassword = await this.passwordEncrypter.compare(
      password,
      user.password,
    );
    if (!matchPassword) {
      throw new InvalidCredentialsError();
    }

    const fiveMinutesInSeconds = 60 * 5;
    const oneDayInSeconds = 60 * 60 * 24;
    const accessToken = await this.tokenManager.generate(
      user.id,
      fiveMinutesInSeconds,
    );
    const refreshToken = await this.refreshManager.generate(
      user.id,
      oneDayInSeconds,
    );
    this.refreshStorage.set(user.id, refreshToken);

    return { accessToken, refreshToken };
  }
}
