export interface IRefreshRepository {
  insert(key: string, token: string): Promise<boolean>;
  findToken(key: string, token: string): Promise<boolean>;
  clearInvalid(olderThan: number): Promise<void>;
}
