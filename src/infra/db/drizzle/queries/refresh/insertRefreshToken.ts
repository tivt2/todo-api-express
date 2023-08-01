import { TRefresh } from '../../../../../domain/entity/refresh';
import db from '../../db';
import { refreshSchema } from '../../models/refresh-model';

export async function insertRefreshToken(refreshToken: {
  userId: string;
  token: string;
  createdAt?: Date;
}): Promise<TRefresh | undefined> {
  const { userId, token, createdAt } = refreshToken;
  const [refresh, ..._] = await db
    .insert(refreshSchema)
    .values({ userId, token, createdAt: createdAt ?? new Date() })
    .returning();

  return refresh;
}
