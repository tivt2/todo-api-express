import { ITokenManager } from '../../domain/interface/token-manager-interface';
import jwt from 'jsonwebtoken';

type JWT_PAYLOAD = {
  userId: string;
};

export class TokenManager implements ITokenManager {
  async generate(userId: string): Promise<string> {
    const token = jwt.sign({ userId }, process.env.JWT_ACCESS_SECRET as string);
    return token;
  }

  async validate(token: string): Promise<string> {
    const decoded = jwt.verify(
      token,
      process.env.JWT_ACCESS_SECRET as string,
    ) as JWT_PAYLOAD;

    return decoded.userId;
  }
}
