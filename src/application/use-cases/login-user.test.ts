import { UserRepositorySpy } from '../../mocks/user-repository-spy';
import { PasswordEncrypterSpy } from '../../mocks/password-encrypter-spy';
import { TokenManagerSpy } from '../../mocks/token-manager-spy';
import { LoginUser } from './login-user';

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
  test('login method should corretly ', async () => {
    const { sut, userRepoSpy, tokenManagerSpy, passwordEncrypterSpy } =
      makeSut();
    userRepoSpy.repo.push({
      id: 'any_id',
      username: 'any_username',
      hashedPassword: 'hashed_password',
      createdAt: new Date(),
    });
    const username = 'any_username';
    const password = 'any_password';

    const token = await sut.login('any_username', 'any_password');
  });
});
