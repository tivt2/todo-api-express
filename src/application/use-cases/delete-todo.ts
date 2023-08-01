import { TTodo } from '../../domain/entity/todo';
import { ITodoRepository } from '../../domain/interface/todo-repository-interface';

export class DeleteTodo {
  constructor(private todoRepository: ITodoRepository) {}

  async delete(userId: string, todoId: string): Promise<TTodo> {
    const deletedTodo = this.todoRepository.removeTodo(userId, todoId);
    return deletedTodo;
  }
}
