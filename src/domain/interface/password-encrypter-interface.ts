export interface IPasswordEncrypter {
  hashPassword(password: string): Promise<string>;
  compare(password: string, hashedPassword: string): Promise<boolean>;
}
