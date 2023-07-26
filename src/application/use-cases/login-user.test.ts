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

  test('login method should call with invalid password and throw error', async () => {
    const { sut, userRepoSpy, passwordEncrypterSpy } = makeSut();
    const username = 'valid_username';
    const password = 'invalid_password';
    userRepoSpy.repo.push({
      id: 'any_id',
      username: 'valid_username',
      password: 'any_hashed_password',
      createdAt: new Date(),
    });
    passwordEncrypterSpy.isValid = false;

    await expect(async () => {
      await sut.login(username, password);
    }).rejects.toThrow(InvalidCredentialsError);
  });

  test('login method should call with correct username and password, and return a token', async () => {
    const { sut, userRepoSpy, passwordEncrypterSpy, tokenManagerSpy } =
      makeSut();
    const username = 'valid_username';
    const password = 'valid_password';
    userRepoSpy.repo.push({
      id: 'any_id',
      username: 'valid_username',
      password: 'any_hashed_password',
      createdAt: new Date(),
    });

    const token = await sut.login(username, password);

    expect(username).toBe(userRepoSpy.repo[0].username);
    expect(password).toBe(passwordEncrypterSpy.password);
    expect(token).toBe(tokenManagerSpy.token);
  });
});
