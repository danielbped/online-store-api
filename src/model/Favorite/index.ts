import { Repository } from "typeorm";
import { AppDataSource } from "../../database";
import { Favorite } from "../../entity/Favorite";
import { ICreateFavoriteDTO } from "../../entity/Favorite";

export default class FavoriteModel {
  private favoriteRepository: Repository<Favorite>;

  public constructor() {
    this.favoriteRepository = AppDataSource.getRepository(Favorite);
  }

  public async list(): Promise<Favorite[]> {
    return this.favoriteRepository.find();
  }

  public async getByUser(id: string): Promise<Favorite[]> {
    return this.favoriteRepository.findBy({ user: { id } });
  }

  public async findById(id: string): Promise<Favorite | null> {
    return this.favoriteRepository.findOne({ where: { id } });
  }

  public async create(data: ICreateFavoriteDTO): Promise<Favorite> {
    const favorite = new Favorite(data);

    return this.favoriteRepository.save(favorite);
  }

  public async remove(id: string) {
    return this.favoriteRepository.delete(id);
  }
}