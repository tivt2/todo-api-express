import { TRefreshStorageValue } from '../../domain/entity/refresh-storage-value';
import { IRefreshStorage } from '../../domain/interface/refresh-storage-interface';
import { MyHashMap } from './data-structure/my-hash-map';

export class RefreshStorage implements IRefreshStorage {
  constructor(private storage = new MyHashMap<TRefreshStorageValue>()) {}

  setToken(
    key: string,
    value: TRefreshStorageValue,
  ): TRefreshStorageValue | undefined {
    return this.storage.set(key, value);
  }

  getToken(key: string): TRefreshStorageValue | undefined {
    return this.storage.get(key);
  }

  removeToken(key: string): TRefreshStorageValue | undefined {
    return this.storage.remove(key);
  }
}
