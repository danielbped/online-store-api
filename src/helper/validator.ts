export class UserValidator {
  public validateEmail(email: string): boolean {
    const REGEX_EMAIL = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i

    return REGEX_EMAIL.test(email);
  };

  public validatePassword(password: string): boolean {
    return password.length >= 8;
  };

  public validateName(name: string): boolean {
    return name.length >= 3;
  };
};

export class FavoriteValidator {
  public validateTitle(title: string): boolean {
    return title.length >= 3;
  };

  public validatePrice(price: number): boolean {
    return Number(price) > 0;
  };

  public validateItemId(id: string): boolean {
    return id !== '';
  };

  public validateImages(images: string[]): boolean {
    return typeof images === 'object' && images.length > 0;
  };
};