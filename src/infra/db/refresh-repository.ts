import { TRefresh } from '../../domain/entity/refresh';
import { IRefreshRepository } from '../../domain/interface/refresh-repository-interface';
import { InsertRefreshError } from '../errors/insert-refresh-error';
import { RefreshNotFoundError } from '../errors/refresh-not-found-error';
import { findFirstRefreshToken } from './drizzle/queries/findFirstRefreshToken';
import { insertRefreshToken } from './drizzle/queries/insertRefreshToken';

export class RefreshRepository implements IRefreshRepository {
  async insertToken(
    userId: string,
    token: string,
    createdAt?: Date,
  ): Promise<TRefresh> {
    const refresh = await insertRefreshToken({ userId, token, createdAt });
    if (!refresh) {
      throw new InsertRefreshError();
    }

    return refresh;
  }

  async findToken(userId: string, token: string): Promise<TRefresh> {
    const refresh = await findFirstRefreshToken(userId, token);
    if (!refresh) {
      throw new RefreshNotFoundError();
    }

    return refresh;
  }

  async clearInvalid(olderThan: number): Promise<void> {}
}
