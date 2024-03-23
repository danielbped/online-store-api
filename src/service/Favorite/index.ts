
import { ICreateFavoriteDTO } from "../../entity/Favorite";
import FavoriteModel from "../../model/Favorite";


export default class FavoriteService {
  private favoriteModel = new FavoriteModel();

  public async getAll() {
    return this.favoriteModel.list();
  }

  public async getAllByUser(id: string) {
    return this.favoriteModel.getByUser(id);
  }

  public async create(favorite: ICreateFavoriteDTO) {
    if (favorite.title && favorite.itemId && favorite.price && favorite.user) {
      try {
        return this.favoriteModel.create(favorite);
      } catch (err: any) {
        throw new Error(err.message);
      }
    }

    throw new Error('Missing required parameters.');
  }

  public async remove(id: string) {
    if (id) {
      try {
        const favorite = await this.favoriteModel.findById(id);
        if (!favorite) {
          throw new Error('Favorite not found.');
        };

        return this.favoriteModel.remove(id);
      } catch (err: any) {
        throw new Error(err.message);
      }
    }

    throw new Error('Missing favorite Id.');
  }
}