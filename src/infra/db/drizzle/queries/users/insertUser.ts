import { TUser } from '../../../../../domain/entity/user';
import db from '../../db';
import { usersSchema } from '../../models/users-model';

export async function insertUser(newUser: {
  username: string;
  password: string;
  todosOrder: string[];
}): Promise<TUser | undefined> {
  const [user] = await db.insert(usersSchema).values(newUser).returning();
  return user;
}
