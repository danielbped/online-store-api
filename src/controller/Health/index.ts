import { Router } from 'express';
import { StatusCodes } from 'http-status-codes'
import ErrorMessage from '../../utils/ErrorMessage';

const router = Router({ mergeParams: true });

router.get('/', async (_req, res) => {
  try {
    return res.status(StatusCodes.OK).json({ message: 'OK' });
  } catch (err: any) {
    console.error(err.message);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: err.message || ErrorMessage.InternalServerError
    });
  };
});

const health = (root: Router) => {
  root.use('/health', router)
};

export { health };