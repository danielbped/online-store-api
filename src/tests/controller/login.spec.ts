import request from 'supertest';
import { StatusCodes } from 'http-status-codes';
import express, { NextFunction, Request, Response } from 'express';
import login from '../../controller/Login';
import UserService from '../../service/User';
import LoginValidation from '../../middleware/Login';

jest.mock('../../service/User');

const MOCKED_LOGIN = {
  email: 'MOCKED_EMAIL@EMAIL.COM',
  password: 'MOCKED_PASSWORD',
};

const MOCKED_TOKEN = 'MOCKED_TOKEN';

const createdAt = new Date();
const updatedAt = new Date();

const MOCKED_USER = {
  "id": "MOCKED_USER_1_ID",
  "firstName": "MOCKED_USER_1_FIRST_NAME",
  "lastName": "MOCKED_USER_1_LAST_NAME",
  "email": "MOCKED_USER_1_EMAIL@EMAIL.COM",
  createdAt,
  updatedAt,
  "password": "<PASSWORD>"
};

describe.only('Expected that Login Route', () => {
  let app: express.Express;
  let userService: UserService;
  let loginValidation: LoginValidation;

  beforeEach(() => {
    jest.clearAllMocks();
    app = express();
    app.use(express.json());
    userService = new UserService();
    loginValidation = new LoginValidation(userService);
    login(app);
  });

  test('1 - Responds with status code 200 and token on successful login', async () => {
    jest.spyOn(userService, 'findByEmail').mockResolvedValue(MOCKED_USER);
    jest.spyOn(loginValidation, 'validateInfo').mockImplementation((_req: Request, _res: Response, next: NextFunction): any => next());
  
    jest.spyOn(userService, 'findByEmail').mockResolvedValue(MOCKED_USER);
    jest.spyOn(userService, 'login').mockResolvedValue(MOCKED_TOKEN);
  
    const response = await request(app)
      .post('/login')
      .send(MOCKED_LOGIN);
  
    expect(response.status).toBe(StatusCodes.OK);
    expect(response.body).toEqual(MOCKED_TOKEN);
    expect(UserService.prototype.login).toHaveBeenCalledWith(MOCKED_LOGIN.email, MOCKED_LOGIN.password);
    expect(UserService.prototype.findByEmail).toHaveBeenCalledWith(MOCKED_LOGIN.email);
  });
});

