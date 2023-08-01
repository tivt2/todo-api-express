export class InsertTodoError extends Error {
  constructor() {
    super("Couldn't insert new todo");
  }
}