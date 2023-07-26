import { ITokenManager } from '../../domain/interface/token-manager-interface';
import jwt from 'jsonwebtoken';
import { InvalidTokenError } from './error/invalid-token-error';

type JWT_PAYLOAD = {
  userId: string;
};

export class TokenManager implements ITokenManager {
  async generate(userId: string): Promise<string> {
    const token = jwt.sign({ userId }, process.env.JWT_ACCESS_SECRET as string);
    return token;
  }

  async validate(token: string): Promise<string> {
    try {
      const decoded = jwt.verify(
        token,
        process.env.JWT_ACCESS_SECRET as string,
      ) as JWT_PAYLOAD;

      return decoded.userId;
    } catch (err) {
      throw new InvalidTokenError();
    }
  }
}
