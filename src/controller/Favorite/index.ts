import { Router } from 'express';
import { StatusCodes } from 'http-status-codes';
import FavoriteService from '../../service/Favorite';
import Favorite from '../../entity/Favorite';
import ErrorMessage from '../../utils/ErrorMessage';
import Authentication from '../../middleware/Authentication';
import UserService from '../../service/User';
import { Request, Response } from 'express';
import FavoriteValidation from '../../middleware/Favorite';

const router = Router({ mergeParams: true });

const favoriteService = new FavoriteService();

const { validateInfo } = new FavoriteValidation();

const userService = new UserService();

const { isTokenValid, isAuthorized } = new Authentication();

router.get('/', async (_req: Request, res: Response) => {
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

router.get('/:id', isAuthorized, async (req: Request, res: Response) => {
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

router.post('/:id', isAuthorized, validateInfo, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { title, itemId, price, images } = req.body;

    const user = await userService.findById(id);

    const result = await favoriteService.create({ title, itemId, price, images, user } as Favorite);

    return res.status(StatusCodes.CREATED).json(result);
  } catch (err: any) {
    console.error(err.message);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: err.message || ErrorMessage.InternalServerError
    });
  };
});

router.delete('/:id/:favId', isAuthorized, async (req: Request, res: Response) => {
  try {
    const { favId } = req.params;
    await favoriteService.remove(favId);

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