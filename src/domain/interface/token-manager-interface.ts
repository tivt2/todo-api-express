export interface ITokenManager {
  generate(userId: string, invalidateTimeInSeconds: number): Promise<string>;
  validate(token: string): Promise<string | undefined>;
}
