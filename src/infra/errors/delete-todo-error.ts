export class DeleteTodoError extends Error {
  constructor() {
    super("Couldn't delete todo");
  }
}