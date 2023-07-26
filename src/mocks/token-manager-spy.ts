import { ITokenManager } from '../domain/interface/token-manager-interface';
import jwt from 'jsonwebtoken';

type JWT_PAYLOAD = {
  userId: string;
};

export class TokenManagerSpy implements ITokenManager {
  userId = '';
  token = '';

  async generate(userId: string): Promise<string> {
    this.userId = userId;
    const token = jwt.sign({ userId }, process.env.JWT_ACCESS_SECRET as string);
    this.token = token;
    return token;
  }

  async validate(token: string): Promise<string> {
    this.token = token;
    const decoded = jwt.verify(
      token,
      process.env.JWT_ACCESS_SECRET as string,
    ) as JWT_PAYLOAD;

    return decoded.userId;
  }
}
