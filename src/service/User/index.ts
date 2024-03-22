
import { TokenGenerator } from "../../helper/generateToken";
import PasswordHandler from "../../helper/passwordHandler";
import UserModel from "../../model/User";
import { ICreateUserDTO } from "../../entity/User";

export default class UserService {
  private passwordHandler = new PasswordHandler();

  private tokenGenerator = new TokenGenerator();

  private userModel = new UserModel();

  public async getAll() {
    return this.userModel.list();
  }

  public async create(user: ICreateUserDTO) {
    if (user.email && user.password && user.firstName) {

      try {
        const hashPassword = await this.passwordHandler.encode(user.password);

        if (hashPassword) {
          return this.userModel.create({ ...user, password: hashPassword });
        }

        throw new Error('Something went wrong while encoding password.');
      } catch (err: any) {
        throw new Error(err.message);
      }
    }

    throw new Error('Missing required parameters.');
  }

  public async login(email: string, password: string): Promise<string> {
    if (email && password) {
      try {
        const user = await this.userModel.findByEmail(email);

        if (!user) {
          throw new Error('User not found.');
        }

        const validPassword = await this.passwordHandler.compare(password, user.password);

        if (!validPassword) {
          throw new Error('Wrong password.');
        }

        const token = this.tokenGenerator.generate(user);
        
        return token;
      } catch (err: any) {
        throw new Error(err.message);
      }
    }

    throw new Error('Missing required parameters.');
  }
}