export interface IUserInputValidator {
  isInvalid(email: string, password: string): boolean;
}
