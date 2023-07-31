import { TTodo } from '../entity/todo';

export interface ITodoRepository {
  insertTodo(
    userId: string,
    content: string,
    completed: boolean,
  ): Promise<TTodo>;
  getUserTodos(userId: string): Promise<TTodo | undefined>;
}
