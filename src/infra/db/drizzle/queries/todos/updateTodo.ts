import { eq } from "drizzle-orm";
import { TTodo } from "../../../../../domain/entity/todo";
import db from "../../db";
import { todosSchema } from "../../models/todos-model";

export async function updateTodo(userId: string, content?: string, completed?: boolean): Promise<TTodo | undefined> {
  const [todo] = await db.update(todosSchema).set({content, completed, updatedAt: new Date()}).where(eq(todosSchema.id, userId)).returning()
  return todo
}