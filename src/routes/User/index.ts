import { Router } from 'express';
import { StatusCodes } from 'http-status-codes'
import User from '../../entity/User';
import ErrorMessage from '../../utils/ErrorMessage';
import UserValidation from '../../middleware/User';
import { Request, Response } from 'express';
import UserController from '../../controller/User';

const router = Router({ mergeParams: true });

const { validateInfo } = new UserValidation();

const userController = new UserController();

/**
 * @openapi
 * /user:
 *   post:
 *     tags:
 *       - Users
 *     description: Registra um novo usuário
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateUserInput'
 *     responses:
 *       200:
 *         description: Sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CreateUserResponse'
 *       500:
 *         description: Erro interno do sistema ou usuário já existe.
 *       400:
 *         description: Dados inválidos.
*/
router.post('/', validateInfo, async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    const result = await userController.create({ firstName, lastName, email, password } as User);

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