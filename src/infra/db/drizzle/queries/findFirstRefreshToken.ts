import { and, eq } from 'drizzle-orm';
import { TRefresh } from '../../../../domain/entity/refresh';
import db from '../db';
import { refreshSchema } from '../models/refresh-model';

export async function findFirstRefreshToken(
  userId: string,
  token: string,
): Promise<TRefresh | undefined> {
  const refresh = await db.query.refreshSchema.findFirst({
    where: and(
      eq(refreshSchema.userId, userId),
      eq(refreshSchema.token, token),
    ),
  });
  return refresh;
}
