import LoginController from "../../controller/Login";
import UserController from "../../controller/User";
import User from "../../entity/User";
import ErrorMessage from "../../utils/ErrorMessage";

describe('Expect that UserService can', () => {
  let userController: UserController;
  let loginController: LoginController;

  beforeEach(() => {
    userController = new UserController();
    loginController = new LoginController();
    jest.clearAllMocks();
  });

  const createdAt = new Date();
  const updatedAt = new Date();

  test('1 - Get all users', async () => {
    const ExpectedResponse = [
      {
        "id": 'MOCKED_ID_1',
        "firstName": 'MOCKED_FIRST_NAME',
        "lastName": "MOCKED_LAST_NAME",
        "email": 'MOCKED_EMAIL_1@EMAIL.COM',
        "password": '<PASSWORD>',
        createdAt,
        updatedAt
      },
      {
        "id": 'MOCKED_ID_2',
        "firstName": 'MOCKED_FIRST_NAME',
        "lastName": "MOCKED_LAST_NAME",
        "email": 'MOCKED_EMAIL_2@EMAIL.COM',
        "password": '<PASSWORD>',
        createdAt,
        updatedAt
      }
    ];

    const mockUserList = jest.spyOn(userController, 'getAll');
    mockUserList.mockResolvedValue(ExpectedResponse);

    const userList = await userController.getAll();

    expect(userList).toEqual(ExpectedResponse);
    expect(mockUserList).toHaveBeenCalled();
  });

  test('2 - Find a user by Id', async () => {
    const ExpectedResponse = {
      "id": 'MOCKED_ID_1',
      "firstName": 'MOCKED_FIRST_NAME',
      "lastName": "MOCKED_LAST_NAME",
      "email": 'MOCKED_EMAIL_1@EMAIL.COM',
      "password": '<PASSWORD>',
      createdAt,
      updatedAt
    };

    const mockUser = jest.spyOn(userController, 'findById');
    mockUser.mockResolvedValue(ExpectedResponse);

    const user = await userController.findById(ExpectedResponse.id);

    expect(user).toEqual(ExpectedResponse);
    expect(mockUser).toHaveBeenCalled();
  });

  test('3 - Handle error when user is not found in findById', async () => {
    const nonExistentUserId = 'NON_EXISTENT_ID';
  
    const mockFindById = jest.spyOn(userController, 'findById');
    mockFindById.mockRejectedValue(new Error(ErrorMessage.UserNotFound));

    await expect(userController.findById(nonExistentUserId)).rejects.toThrow(ErrorMessage.UserNotFound);

    expect(mockFindById).toHaveBeenCalledWith(nonExistentUserId);
  });

  test('4 - Create a new user', async () => {
    const newUser = {
      "firstName": 'MOCKED_FIRST_NAME',
      "lastName": "MOCKED_LAST_NAME",
      "email": 'MOCKED_EMAIL@EMAIL.COM',
      "password": '<PASSWORD>',
    };

    const ExpectedResponse = {
      "id": 'MOCKED_ID',
      "firstName": 'MOCKED_FIRST_NAME',
      "lastName": "MOCKED_LAST_NAME",
      "email": 'MOCKED_EMAIL@EMAIL.COM',
      "password": '<PASSWORD>',
      createdAt,
      updatedAt
    };

    const mockCreate = jest.spyOn(userController, 'create');
    mockCreate.mockResolvedValue(ExpectedResponse);

    const createdUser = await userController.create(newUser);

    expect(createdUser).toEqual(ExpectedResponse);
    expect(mockCreate).toHaveBeenCalledWith(newUser);
  });

  test('5 - Handle errors when creating a user', async () => {
    const newUser = {
      "lastName": "MOCKED_LAST_NAME",
      "email": 'MOCKED_EMAIL@EMAIL.COM',
      "password": '<PASSWORD>',
    };

    await expect(userController.create(newUser as User)).rejects.toThrow(ErrorMessage.MissingRequiredParameters);
  });

  test('6 - Login a user', async () => {
    const userEmail = 'MOCKED_EMAIL@EMAIL.COM';
    const userPassword = '<PASSWORD>';

    const mockFindByEmail = jest.spyOn(userController, 'findByEmail');
    mockFindByEmail.mockResolvedValue({
      id: 'MOCKED_ID',
      firstName: 'MOCKED_EMAIL@EMAIL.COM',
      lastName: 'MOCKED_LAST_NAME',
      email: userEmail,
      password: '<PASSWORD>',
      createdAt,
      updatedAt
    });

    const token = await loginController.execute(userEmail, userPassword);

    expect(typeof token).toBe('string');
    expect(token?.length).toBeGreaterThan(0);
    expect(mockFindByEmail).toHaveBeenCalledWith(userEmail);
  });

  test('7 - Handle errors when logging in a user', async () => {
    const userEmail = 'MOCKED_NON_EXISTENT_EMAIL@EMAIL.COM';
    const userPassword = '<PASSWORD>';

    const mockFindByEmail = jest.spyOn(userController, 'findByEmail');
    mockFindByEmail.mockRejectedValue(null);

    await expect(loginController.execute(userEmail, userPassword)).rejects.toThrow(ErrorMessage.UserNotFound);
  });

  test('8 - Find a user by Email', async () => {
    const ExpectedResponse = {
      "id": 'MOCKED_ID_1',
      "firstName": 'MOCKED_FIRST_NAME',
      "lastName": "MOCKED_LAST_NAME",
      "email": 'MOCKED_EMAIL_1@EMAIL.COM',
      "password": '<PASSWORD>',
      createdAt,
      updatedAt
    };

    const mockUser = jest.spyOn(userController, 'findByEmail');
    mockUser.mockResolvedValue(ExpectedResponse);

    const user = await userController.findByEmail(ExpectedResponse.email);

    expect(user).toEqual(ExpectedResponse);
    expect(mockUser).toHaveBeenCalled();
  });

  test('9 - Handle error when user is not found in Email', async () => {
    const nonExistentUserEmail = 'NON_EXISTENT_EMAIL@EMAIL.COM';
  
    const mockFindByEmail = jest.spyOn(userController, 'findByEmail');
    mockFindByEmail.mockRejectedValue(new Error(ErrorMessage.UserNotFound));

    await expect(userController.findByEmail(nonExistentUserEmail)).rejects.toThrow(ErrorMessage.UserNotFound);

    expect(mockFindByEmail).toHaveBeenCalledWith(nonExistentUserEmail);
  });
});