export class FindUserTodosError extends Error {
  constructor() {
    super("Couldn't find user todos");
  }
}