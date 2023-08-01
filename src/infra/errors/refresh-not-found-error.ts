export class RefreshNotFoundError extends Error {
  constructor() {
    super('Refresh token not found');
  }
}
