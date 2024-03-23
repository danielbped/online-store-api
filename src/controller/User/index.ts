import { Router } from 'express';
import { StatusCodes } from 'http-status-codes'
import UserService from '../../service/User';
import User from '../../entity/User';
import ErrorMessage from '../../utils/ErrorMessage';

const router = Router({ mergeParams: true });

const userService = new UserService();

router.get('/', async (_req, res) => {
  try {
    const result = await userService.getAll();

    return res.status(StatusCodes.OK).json(result);
  } catch (err: any) {
    console.error(err.message);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: err.message || ErrorMessage.InternalServerError
    });
  };
});

router.post('/', async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    const result = await userService.create({ firstName, lastName, email, password } as User);

    return res.status(StatusCodes.CREATED).json(result);
  } catch (err: any) {
    console.error(err);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: err.message || ErrorMessage.InternalServerError
    });
  };
});

const user = (root: Router) => {
  root.use('/user', router)
};

export default user;