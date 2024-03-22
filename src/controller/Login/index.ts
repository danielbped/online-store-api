import { Router } from 'express';
import { StatusCodes } from 'http-status-codes'
import UserService from '../../service/User';

const router = Router({ mergeParams: true });

const userService = new UserService();

router.post('/', async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await userService.login(email, password);

    if (!result) {
      return res.status(StatusCodes.NOT_FOUND).json(result);
    }

    return res.status(StatusCodes.OK).json(result);
  } catch (err: any) {
    console.error(err);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: err.message || 'Internal server error'
    });
  };
});

const login = (root: Router) => {
  root.use('/login', router)
};

export { login };