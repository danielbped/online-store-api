import { NextFunction, Router } from 'express';
import { StatusCodes } from 'http-status-codes'
import ErrorMessage from '../../utils/ErrorMessage';
import LoginValidation from '../../middleware/Login';
import { Request, Response } from 'express';
import LoginController from '../../controller/Login';
import UserController from '../../controller/User';

const router = Router({ mergeParams: true });

const loginController = new LoginController();

const userController = new UserController();

const loginValidation = new LoginValidation(userController);

/**
 * @openapi
 * /login:
 *   post:
 *     tags:
 *       - Login
 *     description: Realiza o login de um usuário
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginInput'
 *     responses:
 *       200:
 *         description: Sucesso.
 *         content:
 *          text/plain:
 *            schema:
 *              type: string
 *              example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9"
 *       500:
 *         description: Erro interno do sistema.
 *       404:
 *         description: Usuário não encontrado.
*/
router.post('/', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const result = await loginController.execute(email, password);

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

const validateLogin = (req: Request, res: Response, next: NextFunction) => {
  return loginValidation.validateInfo(req, res, next);
};

const login = (root: Router) => {
  root.use('/login',
    validateLogin,
    router,
  )
};

export default login;