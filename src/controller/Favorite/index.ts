import { Router } from 'express';
import { StatusCodes } from 'http-status-codes';
import FavoriteService from '../../service/Favorite';
import Favorite from '../../entity/Favorite';
import ErrorMessage from '../../utils/ErrorMessage';
import Authentication from '../../middleware/Authentication';

const router = Router({ mergeParams: true });

const favoriteService = new FavoriteService();

const { isTokenValid } = new Authentication();

router.get('/', async (_req, res) => {
  try {
    const result = await favoriteService.getAll();

    return res.status(StatusCodes.OK).json(result);
  } catch (err: any) {
    console.error(err.message);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: err.message || ErrorMessage.InternalServerError
    });
  };
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await favoriteService.getAllByUser(id);

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
    const { title, itemId, price, images, user } = req.body;
    const result = await favoriteService.create({ title, itemId, price, images, user } as Favorite);

    return res.status(StatusCodes.CREATED).json(result);
  } catch (err: any) {
    console.error(err.message);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: err.message || ErrorMessage.InternalServerError
    });
  };
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    await favoriteService.remove(id);

    return res.status(StatusCodes.NO_CONTENT).send();
  } catch (err: any) {
    console.error(err.message);
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