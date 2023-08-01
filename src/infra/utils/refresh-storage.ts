import { IRefreshStorage } from '../../domain/interface/refresh-storage-interface';
import { MyHashMap } from './data-structure/my-hash-map';

type TRefreshStorage = { token: string; createdAt: Date };

export class RefreshStorage implements IRefreshStorage {
  private nextDel: {userId: string, value: TRefreshStorage} | undefined
  private deleteTimeout: NodeJS.Timeout = setTimeout(() => {});
  private storage = new MyHashMap<TRefreshStorage>()

  constructor(private expiresInMs: number) {}

  setToken(userId: string, value: TRefreshStorage): TRefreshStorage | undefined {
    if (!this.nextDel || value.createdAt < this.nextDel.value.createdAt) {
      this.nextDel = {userId, value}
      this.newDeleteTimeout()
    }
    return this.storage.set(userId, value);
  }

  getToken(userId: string): TRefreshStorage | undefined {
    return this.storage.get(userId);
  }

  removeToken(userId: string): TRefreshStorage | undefined {
    return this.storage.remove(userId);
  }

  print() {
    this.storage.print()
  }

  private newDeleteTimeout(): void {
    if (!this.nextDel) {
      return
    }

    const userId = this.nextDel.userId
    const timeoutInMs = this.nextDel.value.createdAt.getTime() + this.expiresInMs - new Date().getTime()
    if (timeoutInMs <= 0){
      this.removeToken(userId)
      return
    }
    clearTimeout(this.deleteTimeout)
    this.deleteTimeout = setTimeout(() => {
      this.removeToken(userId);
      this.nextDel = undefined
    }, timeoutInMs)
  }
}
