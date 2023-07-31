import { IRefreshStorage } from '../../domain/interface/refresh-storage-interface';
import { MyHashMap } from './data-structure/my-hash-map';

type TRefreshStorage = { token: string; createdAt: Date };

export class RefreshStorage implements IRefreshStorage {
  constructor(private storage = new MyHashMap<TRefreshStorage>()) {}

  setToken(key: string, value: TRefreshStorage): TRefreshStorage | undefined {
    return this.storage.set(key, value);
  }

  getToken(key: string): TRefreshStorage | undefined {
    return this.storage.get(key);
  }

  removeToken(key: string): TRefreshStorage | undefined {
    return this.storage.remove(key);
  }
}
