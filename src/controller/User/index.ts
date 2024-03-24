import { ICreateUserDTO } from "../../entity/User";
import UserService from "../../service/User";

export default class UserController {
  private userService: UserService;

  public constructor() {
    this.userService = new UserService();
  };

  public async getAll() {
    return this.userService.getAll();
  };

  public async findById(id: string) {
    return this.userService.findById(id);
  };

  public async findByEmail(email: string) {
    return this.userService.findByEmail(email);
  };

  public async create(user: ICreateUserDTO) {
    return this.userService.create(user);
  };
};