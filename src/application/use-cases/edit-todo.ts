import { ITodoRepository } from '../../domain/interface/todo-repository-interface';

export class EditTodo {
  constructor(private todoRepository: ITodoRepository) {}

  async edit(todoId: string, content?: string, completed?: boolean) {
    const editedTodo = await this.todoRepository.editTodo(
      todoId,
      content,
      completed,
    );
    return editedTodo;
  }
}
