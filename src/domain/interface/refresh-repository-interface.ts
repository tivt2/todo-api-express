import { TRefresh } from '../entity/refresh';

export interface IRefreshRepository {
  insertToken(key: string, token: string): Promise<TRefresh>;
  findToken(key: string, token: string): Promise<TRefresh>;
  clearInvalid(olderThan: number): Promise<void>;
}
