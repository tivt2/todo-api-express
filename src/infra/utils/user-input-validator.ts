import { IUserInputValidator } from '../../domain/interface/user-input-validator-interface';
import z from 'zod';
import validator from 'validator';

export class UserInputValidator implements IUserInputValidator {
  private userInputSchema = z.object({
    username: z.string().min(3),
    password: z
      .string()
      .refine((pass) => validator.isStrongPassword(pass, { minLength: 6 })),
  });
  isValid(username: string, password: string): boolean {
    const isValid = this.userInputSchema.safeParse({ username, password });
    return isValid.success;
  }
}
