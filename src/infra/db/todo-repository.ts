import { TTodo } from '../../domain/entity/todo';
import {
  ITodoRepository,
  TTodosWithUser,
} from '../../domain/interface/todo-repository-interface';
import { InsertTodoError } from '../errors/insert-todo-error';
import { UpdateTodosOrderError } from '../errors/update-todos-order-error';
import { UpdateTodoError } from '../errors/update-todo-error';
import { insertNewTodo } from './drizzle/queries/todos/insertNewTodo';
import { updateTodo } from './drizzle/queries/todos/updateTodo';
import { updateTodosOrder } from './drizzle/queries/todos/moveTodo';
import { DeleteTodoError } from '../errors/delete-todo-error';
import { deleteTodo } from './drizzle/queries/todos/deleteTodo';
import { FindUserTodosError } from '../errors/find-user-todos-error';
import { findManyTodosWithUser } from './drizzle/queries/todos/findManyTodos';

export class TodoRepository implements ITodoRepository {
  async createTodo(
    userId: string,
    content: string,
    completed: boolean,
  ): Promise<TTodo> {
    const todo = await insertNewTodo(userId, content, completed);
    if (!todo) {
      throw new InsertTodoError();
    }
    return todo;
  }

  async editTodo(
    todoId: string,
    content?: string,
    completed?: boolean,
  ): Promise<TTodo> {
    const todo = await updateTodo(todoId, content, completed);
    if (!todo) {
      throw new UpdateTodoError();
    }
    return todo;
  }

  async moveTodo(userId: string, newOrder: string[]): Promise<string[]> {
    const todosOrder = await updateTodosOrder(userId, newOrder);
    if (!todosOrder) {
      throw new UpdateTodosOrderError();
    }
    return todosOrder;
  }

  async removeTodo(userId: string, todoId: string): Promise<TTodo> {
    const todo = await deleteTodo(userId, todoId);
    if (!todo) {
      throw new DeleteTodoError();
    }
    return todo;
  }

  async getUserTodos(userId: string): Promise<TTodosWithUser> {
    const todosWithUser = await findManyTodosWithUser(userId);
    if (!todosWithUser) {
      throw new FindUserTodosError();
    }

    const { password, id, ...rest } = todosWithUser;
    return { ...rest };
  }
}
