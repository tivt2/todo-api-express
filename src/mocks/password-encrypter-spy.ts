import { IPasswordEncrypter } from '../domain/interface/password-encrypter-interface';
import bcrypt from 'bcrypt';

export class PasswordEncrypterSpy implements IPasswordEncrypter {
  password: string = '';
  hashedPassword: string = '';

  async hashPassword(password: string): Promise<string> {
    this.password = password;
    const hashedPassword = await bcrypt.hash(password, 5);
    this.hashedPassword = hashedPassword;
    return hashedPassword;
  }

  async compare(password: string, hashedPassword: string): Promise<boolean> {
    (this.password = password), (this.hashedPassword = hashedPassword);
    return true;
  }
}
