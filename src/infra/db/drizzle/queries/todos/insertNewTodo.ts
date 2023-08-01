import db from "../../db"
import { eq } from "drizzle-orm"
import { TTodo } from "../../../../../domain/entity/todo"
import { usersSchema } from "../../models/users-model"
import { todosSchema } from "../../models/todos-model"

export async function insertNewTodo(userId: string, content: string, completed: boolean): Promise<TTodo | undefined> {
const todo = db.transaction(async (tx) => {
      const user = await tx.query.usersSchema.findFirst({where: eq(usersSchema.id, userId)})
      if (!user) {
        tx.rollback()
        return
      }
      const todoData = {userId, content, completed}
      const [newTodo] = await tx.insert(todosSchema).values(todoData).returning()

      const newTodosOrder = [...user.todosOrder, newTodo.id]
      await tx.update(usersSchema).set({todosOrder: newTodosOrder}).where(eq(usersSchema.id, userId))
      return newTodo
    })
    return todo
}