import { eq } from "drizzle-orm";
import { TTodo } from "../../../../../domain/entity/todo";
import db from "../../db";
import { todosSchema } from "../../models/todos-model";

export async function findManyTodos(userId: string): Promise<TTodo[] | undefined> {
  const todos = await db.query.todosSchema.findMany({where: eq(todosSchema.userId, userId)})
  return todos
}