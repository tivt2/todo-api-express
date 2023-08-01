import { eq } from 'drizzle-orm';
import { TTodo } from '../../../../../domain/entity/todo';
import db from '../../db';
import { todosSchema } from '../../models/todos-model';
import { TUser } from '../../../../../domain/entity/user';

type TUserWithTodos = TUser & { todos: TTodo[] };

export async function findManyTodosWithUser(
  userId: string,
): Promise<TUserWithTodos | undefined> {
  const [userWithTodos] = await db.query.usersSchema.findMany({
    where: eq(todosSchema.id, userId),
    with: {
      todos: true,
    },
  });
  return userWithTodos;
}
