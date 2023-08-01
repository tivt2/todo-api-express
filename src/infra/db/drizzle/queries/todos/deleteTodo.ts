import { eq } from "drizzle-orm";
import { TTodo } from "../../../../../domain/entity/todo";
import db from "../../db";
import { usersSchema } from "../../models/users-model";
import { todosSchema } from "../../models/todos-model";

export async function deleteTodo(userId: string, todoId: string): Promise<TTodo | undefined> {
  const todo = await db.transaction(async (tx) => {
    const user = await tx.query.usersSchema.findFirst({where: eq(usersSchema.id, userId)})
    if (!user) {
      tx.rollback()
      return
    }
    const newOrder = user.todosOrder.filter(id => id !== todoId)
    await tx.update(usersSchema).set({todosOrder: newOrder}).where(eq(usersSchema.id, userId))
    const todo = await tx.delete(todosSchema).where(eq(todosSchema.id, todoId)).returning()
    return todo
  })
  if (!todo) {
    return
  }
  return todo[0]
}