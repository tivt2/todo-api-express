import { TRefresh } from '../../domain/entity/refresh';
import { IRefreshRepository } from '../../domain/interface/refresh-repository-interface';
import { InsertRefreshError } from '../errors/insert-refresh-error';
import { RefreshNotFoundError } from '../errors/refresh-not-found-error';
import { deleteOldTokens } from './drizzle/queries/refresh/deleteOldTokens';
import { findFirstRefreshToken } from './drizzle/queries/refresh/findFirstRefreshToken';
import { insertRefreshToken } from './drizzle/queries/refresh/insertRefreshToken';

export class RefreshRepository implements IRefreshRepository {
  private deleteInterval;
  constructor(private expiresInMs: number, private clearIntervalInMs: number) {
    this.deleteInterval = setInterval(() => this.clearInvalid(expiresInMs), clearIntervalInMs)
  }

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

  private async clearInvalid(clearDelayInMs: number): Promise<void> {
    await deleteOldTokens(clearDelayInMs)
  }
}
