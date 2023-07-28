import { IRefreshRepository } from '../../domain/interface/refresh-repository-interface';
import Refresh from './mongo/models/refresh';

export class RefreshRepository implements IRefreshRepository {
  async insert(key: string, token: string): Promise<boolean> {
    const res = await Refresh.create({ userId: key, token });

    return res.token === token;
  }

  async findToken(key: string, token: string): Promise<boolean> {
    const ans = await Refresh.findOne({ userId: key, token }).lean().exec();
    return ans?.token === token;
  }

  async clearInvalid(olderThan: number): Promise<void> {
    const ans = await Refresh.deleteMany({
      createdAt: { $lt: new Date(new Date().getTime() - olderThan) },
    });
    return;
  }
}
