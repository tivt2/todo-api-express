import { ITokenManager } from '../../domain/interface/token-manager-interface';
import jwt from 'jsonwebtoken';
import { InvalidTokenError } from './error/invalid-token-error';

type JWT_PAYLOAD = {
  userId: string;
};

export class TokenManager implements ITokenManager {
  constructor(private secret: string) {}

  async generate(
    userId: string,
    invalidateTimeInSeconds: number,
  ): Promise<string> {
    const token = jwt.sign({ userId }, this.secret, {
      expiresIn: invalidateTimeInSeconds,
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
