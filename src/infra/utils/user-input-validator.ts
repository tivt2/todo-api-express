import { IUserInputValidator } from '../../domain/interface/user-input-validator-interface';

class UserInputValidator implements IUserInputValidator {
  isInvalid(email: string, password: string): boolean {}
}
