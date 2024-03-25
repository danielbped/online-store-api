import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import ErrorMessage from '../utils/ErrorMessage';
import { FavoriteValidator } from '../helper/validator';

export default class FavoriteValidation {
  private validator = new FavoriteValidator();

  public constructor() {
    this.validator = new FavoriteValidator();
    this.validateInfo = this.validateInfo.bind(this)
  }

  public async validateInfo(req: Request, res: Response, next: NextFunction): Promise<void | Response> {
    try {
      const { title, itemId, price, images } = req.body;

      if (!this.validator.validateTitle(title)) {
        return res.status(StatusCodes.BAD_REQUEST).json({
          message: ErrorMessage.InvalidTitle,
        });
      };

      if (!this.validator.validatePrice(price)) {
        return res.status(StatusCodes.BAD_REQUEST).json({
          message: ErrorMessage.InvalidPrice,
        });
      };

      if (!this.validator.validateItemId(itemId)) {
        return res.status(StatusCodes.BAD_REQUEST).json({
          message: ErrorMessage.InvalidItemId,
        });
      };

      if (!this.validator.validateImages(images)) {
        return res.status(StatusCodes.BAD_REQUEST).json({
          message: ErrorMessage.InvalidImages,
        });
      };

      return next();
    } catch (err: any) {
      console.error(err);
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: err.message || ErrorMessage.InternalServerError });
    };
  };
};