import { IPasswordEncrypter } from '../../domain/interface/password-encrypter-interface';

class passwordEncrypter implements IPasswordEncrypter {
  async hashPassword(password: string): Promise<string> {}

  async compare(password: string, hashedPassword: string): Promise<boolean> {}
}
