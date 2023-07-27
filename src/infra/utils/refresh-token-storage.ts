import { RefreshTokenMap } from './data-structure/refresh-token-map';

export const refreshTokenStorage = (function initializer() {
  let storage: RefreshTokenMap | undefined;
  return function (): RefreshTokenMap {
    if (!storage) {
      storage = new RefreshTokenMap();
    }

    return storage;
  };
})();
