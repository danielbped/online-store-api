import axios, { AxiosInstance } from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const { STORE_API_KEY, STORE_API_PASSWORD, STORE_NAME } = process.env;

export class ProductsProvider {

  private baseURL: AxiosInstance;

  public constructor() {
    this.baseURL = axios.create({
      baseURL: `https://${STORE_API_KEY}:${STORE_API_PASSWORD}@${STORE_NAME}.myshopify.com/admin/api/2024-01/`,
      timeout: 5000,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }

  public async list() {
    try {
      const response = await this.baseURL.get('products.json');
      return response.data;
    } catch (err: any) {
      console.error(err);
      throw new Error(err.message)
    }
  }

  public async findById(id: string) {
    try {
      const response = await this.baseURL.get(`products/${id}.json`);
      return response.data;
    } catch (err: any) {
      console.error(err);
      throw new Error(err.message)
    }
  }
}