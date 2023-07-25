import { ITokenManager } from '../../domain/interface/token-manager-interface';

class TokenManager implements ITokenManager {
  async generate(userId: string): Promise<string> {}

  async validate(token: string): Promise<string> {}
}
