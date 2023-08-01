import { eq } from "drizzle-orm";
import db from "../../db";
import { usersSchema } from "../../models/users-model";

export async function updateTodosOrder(userId: string, newTodosOrder: string[]): Promise<string[] | undefined> {
  const [{todosOrder}] = await db.update(usersSchema)
  .set({todosOrder: newTodosOrder})
  .where(eq(usersSchema.id, userId))
  .returning({todosOrder: usersSchema.todosOrder})

  return todosOrder
}