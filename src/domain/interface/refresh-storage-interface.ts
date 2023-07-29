import { TRefreshStorageValue } from '../entity/refresh-storage-value';

export interface IRefreshStorage {
  setToken(
    key: string,
    value: TRefreshStorageValue,
  ): TRefreshStorageValue | undefined;
  getToken(key: string): TRefreshStorageValue | undefined;
  removeToken(key: string): TRefreshStorageValue | undefined;
}
