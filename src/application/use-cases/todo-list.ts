import {
  ITodoRepository,
  TTodosWithUser,
} from '../../domain/interface/todo-repository-interface';

export class TodoList {
  constructor(private todoRepository: ITodoRepository) {}

  async getList(userId: string): Promise<TTodosWithUser> {
    const todoList = await this.todoRepository.getUserTodos(userId);
    return todoList;
  }
}
