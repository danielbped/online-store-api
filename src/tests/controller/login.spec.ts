import request from 'supertest';
import { StatusCodes } from 'http-status-codes';
import express from 'express';
import login from '../../controller/Login';
import UserService from '../../service/User';

jest.mock('../../service/User');

const MOCKED_LOGIN = {
  email: 'MOCKED_EMAIL',
  password: 'MOCKED_PASSWORD',
};

const MOCKED_TOKEN = 'MOCKED_TOKEN';

describe('Expected that Login Route', () => {
  let app: express.Express;

  beforeEach(() => {
    app = express();
    app.use(express.json());
    login(app);
    jest.clearAllMocks();
  });

  test('1 - Responds with status code 200 and token on successful login', async () => {
    jest.spyOn(UserService.prototype, 'login').mockResolvedValue(MOCKED_TOKEN);

    const response = await request(app)
      .post('/login')
      .send(MOCKED_LOGIN);

    expect(response.status).toBe(StatusCodes.OK);
    expect(response.body).toEqual(MOCKED_TOKEN);
    expect(UserService.prototype.login).toHaveBeenCalledWith(MOCKED_LOGIN.email, MOCKED_LOGIN.password);
  });
});
