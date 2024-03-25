import User from "../../entity/User";
import UserService from "../../service/User";

export default class LoginController {
  private userService: UserService;

  public constructor() {
    this.userService = new UserService();
  };

  public async execute(email: string, password: string): Promise<{ token: string, user: User } | null> {
    return this.userService.login(email, password);
  };
};