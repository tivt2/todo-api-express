import { ITodoRepository } from "../../domain/interface/todo-repository-interface";

export class TodoList {

  constructor(private todoRepository: ITodoRepository){}
}
