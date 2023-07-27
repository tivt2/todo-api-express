type TStorageResponse = { key: string; token: string };

export interface IRefreshStorage {
  set(key: string, token: string): TStorageResponse | undefined;
  get(key: string): TStorageResponse | undefined;
  remove(key: string): TStorageResponse | undefined;
}
