import { StatusCodes } from "http-status-codes";
import { UserValidator } from "../helper/validator";
import { NextFunction, Request, Response } from 'express';
import ErrorMessage from "../utils/ErrorMessage";

export default class UserValidation {
  private validator: UserValidator;

  public constructor() {
    this.validator = new UserValidator();
    this.validateInfo = this.validateInfo.bind(this);
  };

  public async validateInfo(req: Request, res: Response, next: NextFunction): Promise<void | Response> {
    try {
      const { firstName, lastName, email, password } = req.body;

      const validFirstName = this.validator.validateName(firstName);
      const validLastName = this.validator.validateName(lastName);
      const validName = validFirstName && validLastName;
  
      if (!validName) {
        return res.status(StatusCodes.BAD_REQUEST).json({
          message: ErrorMessage.InvalidName,
        });
      };
  
      if (!this.validator.validateEmail(email)) {
        return res.status(StatusCodes.BAD_REQUEST).json({
          message: ErrorMessage.InvalidEmail,
        });
      };
  
      if (!this.validator.validatePassword(password)) {
        return res.status(StatusCodes.BAD_REQUEST).json({
          message: ErrorMessage.InvalidPassword,
        });
      };
  
     return next();
    } catch (err: any) {
      console.error(err);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: err.message || ErrorMessage.InternalServerError });
    };
  };
};