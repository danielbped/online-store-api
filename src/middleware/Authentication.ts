import { StatusCodes } from 'http-status-codes'
import ErrorMessage from '../utils/ErrorMessage';
import { NextFunction, Request, Response } from 'express';
import Token from '../helper/token';
import UserService from '../service/User';

export default class Authentication {
  private token = new Token();

  private userService: UserService;

  public constructor() {
    this.userService = new UserService();
    this.isTokenValid = this.isTokenValid.bind(this);
    this.isAuthorized = this.isAuthorized.bind(this);
  }

  public async isTokenValid(req: Request, res: Response, next: NextFunction): Promise<void | Response> {
    try {
      const token = req.headers.authorization;

      if (!token || typeof token !== 'string') {
        return res.status(StatusCodes.UNAUTHORIZED).json({ message: ErrorMessage.TokenNotFound });
      };

      return next();
    } catch (err: any) {
      console.error(err);
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: err.message });
    };
  };

  public async isAuthorized(req: Request, res: Response, next: NextFunction): Promise<void | Response> {
    const token = (req.headers.authorization as string).split(' ')[1];
        
    const { id } = req.params;

    try {
      if (!id) {
        return res.status(StatusCodes.BAD_REQUEST).json({ message: ErrorMessage.IdNotFound });
      };

      const user = this.userService.findById(id);

      if (!user) {
        return res.status(StatusCodes.BAD_REQUEST).json({ message: ErrorMessage.UserNotFound });
      };

      const loggedUser = this.token.compare(token);

      const isAuthorized = loggedUser.id === id;

      if (!isAuthorized) {
        return res.status(StatusCodes.UNAUTHORIZED).json({ message: ErrorMessage.Unauthorized });
      };

      return next();
    } catch (err: any) {
      console.error(err);
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: err.message || ErrorMessage.InternalServerError });
    };
  };
};