
import Token from "../../helper/token";
import PasswordHandler from "../../helper/passwordHandler";
import UserModel from "../../model/User";
import { ICreateUserDTO } from "../../entity/User";
import ErrorMessage from "../../utils/ErrorMessage";

export default class UserService {
  private passwordHandler = new PasswordHandler();

  private token = new Token();

  private userModel = new UserModel();

  public async getAll() {
    return this.userModel.list();
  };

  public async findById(id: string) {
    const user = this.userModel.findById(id);
    
    if (!user) {
      throw new Error(ErrorMessage.UserNotFound);
    };

    return user;
  };

  public async create(user: ICreateUserDTO) {
    if (user.email && user.password && user.firstName) {

      try {
        const userExists = await this.userModel.findByEmail(user.email);

        if (userExists) {
          throw new Error(ErrorMessage.UserAlreadyExists);
        }

        const hashPassword = await this.passwordHandler.encode(user.password);

        if (!hashPassword) {
          throw new Error(ErrorMessage.EncodeError);
        }
        
        return this.userModel.create({ ...user, password: hashPassword });
      } catch (err: any) {
        throw new Error(err.message);
      }
    }

    throw new Error(ErrorMessage.MissingRequiredParameters);
  };

  public async login(email: string, password: string): Promise<string> {
    if (email && password) {
      try {
        const user = await this.userModel.findByEmail(email);

        if (!user) {
          throw new Error(ErrorMessage.UserNotFound);
        }

        const validPassword = await this.passwordHandler.compare(password, user.password);

        if (!validPassword) {
          throw new Error(ErrorMessage.WrongPassword);
        }

        const token = this.token.generate(user);
        
        return token;
      } catch (err: any) {
        throw new Error(err.message);
      }
    }

    throw new Error(ErrorMessage.MissingRequiredParameters);
  };
}