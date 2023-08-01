import { ITodoRepository } from '../../domain/interface/todo-repository-interface';

export class MoveTodo {
  constructor(private todoRepository: ITodoRepository) {}

  async move(userId: string, newOrder: string[]) {
    const newTodosOrder = this.todoRepository.moveTodo(userId, newOrder);
    return newTodosOrder;
  }
}
