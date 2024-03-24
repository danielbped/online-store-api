import request from 'supertest';
import { StatusCodes } from 'http-status-codes';
import { health } from '../../routes/Health';

describe('Expect that Health Route can', () => {
  const app = require('express')();
  health(app);

  test('1 - Responds with status code 200 and message "OK"', async () => {
    const response = await request(app).get('/health');

    expect(response.status).toBe(StatusCodes.OK);
    expect(response.body).toEqual({ message: 'OK' });
  });
});
