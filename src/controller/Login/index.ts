import { Router } from 'express';
import { StatusCodes } from 'http-status-codes'
import UserService from '../../service/User';
import ErrorMessage from '../../utils/ErrorMessage';
import LoginValidation from '../../middleware/Login';
import { Request, Response } from 'express';

const router = Router({ mergeParams: true });

const userService = new UserService();

const { validateInfo } = new LoginValidation();

router.post('/', async (req: Request, res: Response) => {
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
      message: err.message || ErrorMessage.InternalServerError
    });
  };
});

const login = (root: Router) => {
  root.use('/login',
    validateInfo,
    router,
  )
};

export default login;