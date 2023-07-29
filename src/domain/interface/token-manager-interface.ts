export interface ITokenManager {
  generate(userId: string): Promise<string>;
  validate(token: string): Promise<string | undefined>;
}
