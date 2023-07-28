interface IRefreshRepository {
  insert(key: string, token: string): string;
  findToken(key: string, token: string): string | undefined;
  remove(key: string, token: string): string;
}
