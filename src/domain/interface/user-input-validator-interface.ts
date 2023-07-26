export interface IUserInputValidator {
  isValid(username: string, password: string): boolean;
}
