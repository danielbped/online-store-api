import { User } from "../entity/User";
import { sign, verify } from 'jsonwebtoken';
import dotenv from 'dotenv';

const {
  SECRET_KEY_JWT
} = process.env;

dotenv.config();

export class TokenGenerator {
  public generate(user: User): string {
    return sign({ ...user }, String(SECRET_KEY_JWT), {
      expiresIn: '24h'
    })
  };

  public compare(token: string): User {
    return verify(token, String(SECRET_KEY_JWT)) as User;
  }
}