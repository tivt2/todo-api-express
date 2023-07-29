import { ITokenManager } from '../../domain/interface/token-manager-interface';
import { InvalidTokenError } from './error/invalid-token-error';
import jwt from 'jsonwebtoken';

type JWT_PAYLOAD = {
  userId: string;
};

export class TokenManager implements ITokenManager {
  constructor(private secret: string, private expiresIn: number) {}

  async generate(userId: string): Promise<string> {
    const token = jwt.sign({ userId }, this.secret, {
      expiresIn: this.expiresIn,
    });
    return token;
  }

  async validate(token: string): Promise<string> {
    try {
      const decoded = jwt.verify(token, this.secret) as JWT_PAYLOAD;

      return decoded.userId;
    } catch (err) {
      throw new InvalidTokenError();
    }
  }
}
