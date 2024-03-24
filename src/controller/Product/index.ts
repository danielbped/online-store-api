import ProductsProvider from "../../provider/ProductsProvider";

export default class ProductController {
  private productProvider: ProductsProvider;

  public constructor() {
    this.productProvider = new ProductsProvider();
  };

  public async list(): Promise<any[]> {
    return this.productProvider.list();
  };

  public async findById(id: string): Promise<any> {
    return this.productProvider.findById(id);
  };
};