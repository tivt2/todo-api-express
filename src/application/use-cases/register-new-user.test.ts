import { UserRepositorySpy } from '../../infra/db/user-repository-spy';
import { PasswordEncrypterSpy } from '../../mocks/password-encrypter-spy';
import { RegisterNewUser } from './register-new-user';

function makeSut() {
  const userRepoSpy = new UserRepositorySpy();
  const passwordEncrypterSpy = new PasswordEncrypterSpy();
  const sut = new RegisterNewUser(userRepoSpy, passwordEncrypterSpy);
  return {
    sut,
    userRepoSpy,
    passwordEncrypterSpy,
  };
}

describe('Register new user', () => {
  test('register method should correctly pass the new user data', async () => {
    const { sut, userRepoSpy, passwordEncrypterSpy } = makeSut();
    const username = 'any_username';
    const password = 'any_password';
    await sut.register(username, password);

    expect(username).toBe(userRepoSpy.repo[0].username);
    expect(password).toBe(passwordEncrypterSpy.password);
    expect(passwordEncrypterSpy.hashedPassword).toBe(
      userRepoSpy.repo[0].hashedPassword,
    );
  });
});
