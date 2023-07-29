import { RefreshTokenMap } from './data-structure/refresh-token-map';

export function refreshTokenStorage() {
  let storage: RefreshTokenMap | undefined;
  if (!storage) {
    storage = new RefreshTokenMap();
    return storage;
  }
  return storage;
}
