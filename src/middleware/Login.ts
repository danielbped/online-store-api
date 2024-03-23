import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import UserService from '../service/User';
import ErrorMessage from '../utils/ErrorMessage';
import PasswordHandler from '../helper/passwordHandler';

export default class LoginValidation {
  private userService: UserService;

  private passwordHandler = new PasswordHandler();

  constructor(userService: UserService) {
    this.userService = userService;
  };

  public async validateInfo(req: Request, res: Response, next: NextFunction): Promise<void | Response> {
    try {
      const { email, password } = req.body;

      const user = await this.userService.findByEmail(email);

      if (!user) {
        return res.status(StatusCodes.NOT_FOUND).json({
          message: ErrorMessage.UserNotFound,
        });
      };

      const validPassword = this.passwordHandler.compare(password, user.password);

      if (!validPassword) {
        return res.status(StatusCodes.FORBIDDEN).json({
          message: ErrorMessage.WrongPassword,
        });
      };

      return next();
    } catch (err: any) {
      console.error(err);
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: err.message });
    };
  };
};