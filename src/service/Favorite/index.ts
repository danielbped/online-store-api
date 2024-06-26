
import { ICreateFavoriteDTO } from "../../entity/Favorite";
import FavoriteModel from "../../model/Favorite";
import ErrorMessage from "../../utils/ErrorMessage";

export default class FavoriteService {
  private favoriteModel = new FavoriteModel();

  public async getAll() {
    return this.favoriteModel.list();
  };

  public async getAllByUser(id: string) {
    return this.favoriteModel.getByUser(id);
  };

  public async findById(id: string) {
    return this.favoriteModel.findById(id);
  };

  public async create(favorite: ICreateFavoriteDTO) {
    if (favorite.title && favorite.itemId && favorite.price && favorite.user) {
      try {
        return this.favoriteModel.create(favorite);
      } catch (err: any) {
        console.error(err);
        throw new Error(err.message || ErrorMessage.UnexpectedError);
      };
    };

    throw new Error(ErrorMessage.MissingRequiredParameters);
  };

  public async remove(id: string): Promise<boolean> {
    if (id) {
      try {
        const favorite = await this.favoriteModel.findByItemId(id);

        if (!favorite) {
          throw new Error(ErrorMessage.FavoriteNotFound);
        };

        return this.favoriteModel.remove(id);
      } catch (err: any) {
        console.error(err);
        throw new Error(err.message || ErrorMessage.UnexpectedError);
      };
    };

    throw new Error(ErrorMessage.MissingFavoriteId);
  };
};