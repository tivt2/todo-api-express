export class InsertRefreshError extends Error {
  constructor() {
    super("Couldn't insert refresh token");
  }
}
