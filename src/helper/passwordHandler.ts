import bcrypt from 'bcrypt';

export default class PasswordHandler {
  public encode = (password: string): Promise<string>  => {
    const saltRounds = 10;
    
    return bcrypt.hash(password, saltRounds);
  }

  public compare = (password: string, hash: string): Promise<boolean> => {
    return bcrypt.compare(password, hash);
  }
}