export class UpdateTodoError extends Error {
  constructor() {
    super("Couldn't update todo");
  }
}