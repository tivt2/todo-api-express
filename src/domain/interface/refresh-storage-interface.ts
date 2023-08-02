export type TRefreshStorage = { token: string; createdAt: Date };

export interface IRefreshStorage {
  setToken(key: string, value: TRefreshStorage): TRefreshStorage | undefined;
  getToken(key: string): TRefreshStorage | undefined;
  removeToken(key: string): TRefreshStorage | undefined;
}
