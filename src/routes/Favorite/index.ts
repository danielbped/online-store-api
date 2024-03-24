import { Router } from 'express';
import { StatusCodes } from 'http-status-codes';
import Favorite from '../../entity/Favorite';
import ErrorMessage from '../../utils/ErrorMessage';
import Authentication from '../../middleware/Authentication';
import UserService from '../../service/User';
import { Request, Response } from 'express';
import FavoriteValidation from '../../middleware/Favorite';
import FavoriteController from '../../controller/Favorite';

const router = Router({ mergeParams: true });

const favoriteController = new FavoriteController();

const { validateInfo } = new FavoriteValidation();

const userService = new UserService();

const { isTokenValid, isAuthorized } = new Authentication();

/**
 * @openapi
 * /favorite/{id}:
 *   get:
 *     tags:
 *       - Favorites
 *     description: Retorna uma lista com todos os favoritos de um usuário específico
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID do usuário
 *         required: true
 *     responses:
 *       200:
 *         description: Retorna uma lista com todos os favoritos de um usuário específico.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ListFavoritesResponse'
 *       500:
 *         description: Erro interno do sistema.
*/
router.get('/:id', isAuthorized, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await favoriteController.getAllByUser(id);

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
 * /favorite:
 *   post:
 *     tags:
 *       - Favorites
 *     description: Registra um produto favorito
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateFavoriteInput'
 *     responses:
 *       200:
 *         description: Sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CreateFavoriteResponse'
 *       500:
 *         description: Erro interno do sistema.
 *       401:
 *         description: Token inválido.
 *       400:
 *         description: Dados inválidos.
*/
router.post('/:id', isAuthorized, validateInfo, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { title, itemId, price, images } = req.body;

    const user = await userService.findById(id);

    const result = await favoriteController.create({ title, itemId, price, images, user } as Favorite);

    return res.status(StatusCodes.CREATED).json(result);
  } catch (err: any) {
    console.error(err);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: err.message || ErrorMessage.InternalServerError
    });
  };
});

/**
 * @openapi
 * /favorite/{userId}/{favoriteId}:
 *   delete:
 *     tags:
 *       - Favorites
 *     description: Deleta um produto favorito
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: userId
 *         in: path
 *         description: ID do usuário
 *         required: true
 *       - name: favoriteId
 *         in: path
 *         description: ID do produto
 *         required: true
 *     responses:
 *       204:
 *         description: Sucesso.
 *       500:
 *         description: Erro interno do sistema.
 *       401:
 *         description: Token inválido.
 *       400:
 *         description: Usuário inválido.
*/
router.delete('/:id/:favId', isAuthorized, async (req: Request, res: Response) => {
  try {
    const { favId } = req.params;
    await favoriteController.remove(favId);

    return res.status(StatusCodes.NO_CONTENT).send();
  } catch (err: any) {
    console.error(err);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: err.message || ErrorMessage.InternalServerError
    });
  };
});

const favorite = (root: Router) => {
  root.use('/favorite',
    isTokenValid,
    router
  )
};

export default favorite;