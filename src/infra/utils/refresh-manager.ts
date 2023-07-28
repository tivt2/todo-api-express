import { TokenManager } from './token-manager';

class RefreshManager extends TokenManager implements IRefreshRepository {
  constructor(secret: string, private refreshRepository: IRefreshRepository) {
    super(secret);
  }

  insert(key: string, token: string): string {
    return '';
  }

  findToken(key: string, token: string): string | undefined {
    return;
  }

  remove(key: string, token: string): string {
    return '';
  }
}
