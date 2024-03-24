import { Router } from 'express';
import { StatusCodes } from 'http-status-codes'
import ErrorMessage from '../../utils/ErrorMessage';
import { Request, Response } from 'express';
import HealthController from '../../controller/Health';

const router = Router({ mergeParams: true });
const healthController = new HealthController();

/**
   * @openapi
   * /health:
   *  get:
   *     tags:
   *     - HealthCheck
   *     description: Retorna OK se a aplicação estiver rodando
   *     responses:
   *       200:
   *         description: API está rodando.
   *       500:
   *         description: API não está rodando.
   */
router.get('/', async (_req: Request, res: Response) => {
  try {
    const response = await healthController.getHealth();
    return res.status(StatusCodes.OK).json(response);
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