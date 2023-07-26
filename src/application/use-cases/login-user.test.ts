import { UserRepositorySpy } from '../../mocks/user-repository-spy';
import { PasswordEncrypterSpy } from '../../mocks/password-encrypter-spy';
import { TokenManagerSpy } from '../../mocks/token-manager-spy';
import { LoginUser } from './login-user';
import { InvalidCredentialsError } from '../errors/invalid-credential-error';

function makeSut() {
  const userRepoSpy = new UserRepositorySpy();
  const tokenManagerSpy = new TokenManagerSpy();
  const passwordEncrypterSpy = new PasswordEncrypterSpy();

  const sut = new LoginUser(userRepoSpy, tokenManagerSpy, passwordEncrypterSpy);
  return {
    sut,
    userRepoSpy,
    tokenManagerSpy,
    passwordEncrypterSpy,
  };
}

describe('Login User', () => {
  test('login method should throw error if invalid username', async () => {
    const { sut } = makeSut();
    const username = 'invalid_username';
    const password = 'any_password';

    await expect(async () => {
      await sut.login(username, password);
    }).rejects.toThrow(InvalidCredentialsError);
  });
});
