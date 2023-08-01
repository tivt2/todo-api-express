export class NewUserError extends Error {
  constructor() {
    super("Couldn't create new user");
  }
}
