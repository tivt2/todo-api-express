import { UserRepositorySpy } from '../../mocks/user-repository-spy';
import { PasswordEncrypterSpy } from '../../mocks/password-encrypter-spy';
import { RegisterNewUser } from './register-new-user';
import { TUser } from '../../domain/entity/user';

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
    expect(userRepoSpy.repo[0].hashedPassword).toBe(
      passwordEncrypterSpy.hashedPassword,
    );
  });

  test('register method should correctly encrypt the password before inserting into repo', async () => {
    const { sut, userRepoSpy, passwordEncrypterSpy } = makeSut();
    const username = 'any_username';
    const password = 'any_password';

    await sut.register(username, password);

    expect(passwordEncrypterSpy.hashedPassword).toBe(
      userRepoSpy.repo[0].hashedPassword,
    );
  });

  test('register method should return the new user', async () => {
    const { sut, userRepoSpy } = makeSut();
    const username = 'any_username';
    const password = 'any_password';

    const user = await sut.register(username, password);
    const hashedPassword = userRepoSpy.repo[0].hashedPassword;

    expect(user).toMatchObject<TUser>({
      id: expect.any(String),
      username,
      hashedPassword,
      createdAt: expect.any(Date),
    });
  });
});
