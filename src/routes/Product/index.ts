import { Router } from 'express';
import { StatusCodes } from 'http-status-codes';
import ErrorMessage from '../../utils/ErrorMessage';
import { Request, Response } from 'express';
import ProductController from '../../controller/Product';

const router = Router({ mergeParams: true });

const productController = new ProductController();

/**
 * @openapi
 * /product:
 *  get:
 *     tags:
 *     - Product
 *     description: Retorna uma lista com todos os produtos disponíveis da API externa do Shopify
 *     responses:
 *       200:
 *         description: Retorna uma lista com todos os produtos.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ListProductsResponse'
 *       500:
 *         description: Erro interno do sistema.
*/
router.get('/', async (_req: Request, res: Response) => {
  try {
    const result = await productController.list();

    return res.status(StatusCodes.OK).json(result);
  } catch (err: any) {
    console.error(err);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: err.message || ErrorMessage.InternalServerError
    });
  };
});

/**
 * @openapi
 * /product/{id}:
 *  get:
 *     tags:
 *     - Product
 *     description: Retorna um produto da API externa do Shopify de acordo com o ID
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID do produto
 *         required: true
 *     responses:
 *       200:
 *         description: Retorna um produto da API externa do Shopify de acordo com o ID
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GetProductByIdResponse'
 *       500:
 *         description: Erro interno do sistema.
*/
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await productController.findById(id);

    return res.status(StatusCodes.OK).json(result);
  } catch (err: any) {
    console.error(err);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: err.message || ErrorMessage.InternalServerError
    });
  };
});

const product = (root: Router) => {
  root.use('/product',
    router
  );
};

export default product;