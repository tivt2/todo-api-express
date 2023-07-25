export class InvalidInputError extends Error {
  constructor(message?: string) {
    super(message ?? 'Please provide valid credentials');
  }
}
