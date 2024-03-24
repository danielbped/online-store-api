import UserService from "../../service/User";

export default class LoginController {
  private userService: UserService;

  public constructor() {
    this.userService = new UserService();
  };

  public async execute(email: string, password: string): Promise<string | null> {
    return this.userService.login(email, password);
  };
};