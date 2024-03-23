import { Router } from 'express';
import { StatusCodes } from 'http-status-codes'
import ErrorMessage from '../../utils/ErrorMessage';
import { Request, Response } from 'express';

const router = Router({ mergeParams: true });

router.get('/', async (_req: Request, res: Response) => {
  try {
    return res.status(StatusCodes.OK).json({ message: 'OK' });
  } catch (err: any) {
    console.error(err);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: err.message || ErrorMessage.InternalServerError
    });
  };
});

const health = (root: Router) => {
  root.use('/health', router)
};

export { health };