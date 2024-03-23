import { Router } from 'express';
import { StatusCodes } from 'http-status-codes'
import { ProductsProvider } from '../../provider/ProductsProvider'

const router = Router({ mergeParams: true });

const productsProvider = new ProductsProvider();

router.get('/', async (_req, res) => {
  try {
    const result = await productsProvider.list();

    return res.status(StatusCodes.OK).json(result);
  } catch (err: any) {
    console.error(err.message);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: err.message || 'Internal server error'
    });
  };
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await productsProvider.findById(id);

    return res.status(StatusCodes.OK).json(result);
  } catch (err: any) {
    console.error(err.message);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: err.message || 'Internal server error'
    });
  };
});

const product = (root: Router) => {
  root.use('/product', router);
};

export { product };