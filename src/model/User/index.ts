import { Repository } from "typeorm";
import { AppDataSource } from "../../database";
import User from "../../entity/User";
import { ICreateUserDTO } from "../../entity/User";

export default class UserModel {
  private userRepository: Repository<User>;

  public constructor() {
    this.userRepository = AppDataSource.getRepository(User);
  }

  public async list(): Promise<User[]> {
    return this.userRepository.find();
  }

  public async findByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { email } });
  }

  public async findById(id: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { id } });
  }

  public async create(data: ICreateUserDTO): Promise<User> {
    const user = new User(data);

    return this.userRepository.save(user);
  }
}