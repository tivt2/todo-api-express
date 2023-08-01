import { TTodo } from '../entity/todo';

export interface ITodoRepository {
  createTodo(
    userId: string,
    content: string,
    completed: boolean,
  ): Promise<TTodo>;
  editTodo(
    userId: string,
    updateData: {content?: string, completed?: boolean}
    ): Promise<TTodo>
  moveTodo(
    userId: string,
    newOrder: string[]
    ): Promise<string[]>
  removeTodo(
    userId: string,
    todoId: string,
  ): Promise<TTodo>
  getUserTodos(userId: string): Promise<TTodo[]>;
}
