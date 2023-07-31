import { eq } from 'drizzle-orm';
import { TUser } from '../../../../domain/entity/user';
import db from '../db';
import { usersSchema } from '../models/users-model';

export function findFirstUserByUsername(
  username: string,
): Promise<TUser | undefined> {
  const user = db.query.usersSchema.findFirst({
    where: eq(usersSchema.username, username),
  });
  return user;
}
