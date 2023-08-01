import { TTodo } from '../../domain/entity/todo';
import { ITodoRepository } from '../../domain/interface/todo-repository-interface';

export class CreateNewTodo {
  constructor(private todoRepository: ITodoRepository) {}

  async create(
    userId: string,
    content: string,
    completed: boolean,
  ): Promise<TTodo> {
    const newTodo = await this.todoRepository.createTodo(
      userId,
      content,
      completed,
    );
    return newTodo;
  }
}
