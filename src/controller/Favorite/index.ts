import Favorite, { ICreateFavoriteDTO } from "../../entity/Favorite";
import FavoriteService from "../../service/Favorite";

export default class FavoriteController {
  private favoriteService: FavoriteService;

  public constructor() {
    this.favoriteService = new FavoriteService();
  }

  public async getAll(): Promise<Favorite[]> {
    return this.favoriteService.getAll();
  };

  public async getAllByUser(id: string): Promise<Favorite[]> {
    return this.favoriteService.getAllByUser(id);
  };

  public async create(favorite: ICreateFavoriteDTO): Promise<Favorite> {
    return this.favoriteService.create(favorite);
  };

  public async remove(id: string): Promise<boolean> {
    return this.favoriteService.remove(id);
  };
};