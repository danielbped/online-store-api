import { Router } from 'express';
import { StatusCodes } from 'http-status-codes'
import ProductsProvider from '../../provider/ProductsProvider'
import ErrorMessage from '../../utils/ErrorMessage';
import Authentication from '../../middleware/Authentication';
import { Request, Response } from 'express';

const router = Router({ mergeParams: true });

const productsProvider = new ProductsProvider();

const { isTokenValid } = new Authentication();

router.get('/', async (_req: Request, res: Response) => {
  try {
    const result = await productsProvider.list();

    return res.status(StatusCodes.OK).json(result);
  } catch (err: any) {
    console.error(err.message);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: err.message || ErrorMessage.InternalServerError
    });
  };
});

router.get('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await productsProvider.findById(id);

    return res.status(StatusCodes.OK).json(result);
  } catch (err: any) {
    console.error(err.message);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: err.message || ErrorMessage.InternalServerError
    });
  };
});

const product = (root: Router) => {
  root.use('/product',
    isTokenValid,
    router
  );
};

export default product;