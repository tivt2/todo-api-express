import { TRefresh } from '../../domain/entity/refresh';
import { IRefreshRepository } from '../../domain/interface/refresh-repository-interface';

export class RefreshRepository implements IRefreshRepository {
  async insertToken(key: string, token: string): Promise<TRefresh> {
    return {} as TRefresh;
  }

  async findToken(key: string, token: string): Promise<TRefresh> {
    return {} as TRefresh;
  }

  async clearInvalid(olderThan: number): Promise<void> {}
}
