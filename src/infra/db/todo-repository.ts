import { TTodo } from "../../domain/entity/todo";
import { ITodoRepository } from "../../domain/interface/todo-repository-interface";
import { InsertTodoError } from "../errors/insert-todo-error";
import { UpdateTodosOrderError } from "../errors/update-todos-order-error";
import { UpdateTodoError } from "../errors/update-todo-error";
import { insertNewTodo } from "./drizzle/queries/todos/insertNewTodo";
import { updateTodo } from "./drizzle/queries/todos/updateTodo";
import { updateTodosOrder } from "./drizzle/queries/todos/moveTodo";
import { DeleteTodoError } from "../errors/delete-todo-error";
import { deleteTodo } from "./drizzle/queries/todos/deleteTodo";
import { FindUserTodosError } from "../errors/find-user-todos-error";
import { findManyTodos } from "./drizzle/queries/todos/findManyTodos";

export class TodoRepository implements ITodoRepository {
  async createTodo(userId: string, content: string, completed: boolean): Promise<TTodo> {
    const todo = await insertNewTodo(userId, content, completed)
    if (!todo) {
      throw new InsertTodoError()
    }
    return todo
  }

  async editTodo(userId: string, updateData: {content?: string, completed?: boolean}): Promise<TTodo> {
    const todo = await updateTodo(userId, updateData.content, updateData.completed)
    if (!todo) {
      throw new UpdateTodoError()
    }
    return todo
  }

  async moveTodo(userId: string, newOrder: string[]): Promise<string[]> {
    const todosOrder = await updateTodosOrder(userId, newOrder)
    if (!todosOrder) {
      throw new UpdateTodosOrderError()
    }
    return todosOrder
  }

  async removeTodo(userId: string, todoId: string): Promise<TTodo> {
    const todo = await deleteTodo(userId, todoId)
    if (!todo) {
      throw new DeleteTodoError()
    }
    return todo
  }

  async getUserTodos(userId: string): Promise<TTodo[]> {
    const todos = await findManyTodos(userId)
    if (!todos) {
      throw new FindUserTodosError()
    }
    return todos
  }
}