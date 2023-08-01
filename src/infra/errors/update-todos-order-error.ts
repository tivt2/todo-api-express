export class UpdateTodosOrderError extends Error {
  constructor() {
    super("Couldn't update todos order");
  }
}