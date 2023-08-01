import { TRefresh } from '../entity/refresh';

export interface IRefreshRepository {
  insertToken(
    userId: string,
    token: string,
    createdAt: Date,
  ): Promise<TRefresh>;
  findToken(userId: string, token: string): Promise<TRefresh>;
}
