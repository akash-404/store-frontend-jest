import { PoolClient, QueryResult } from 'pg';
import client from '../database';

//creating return type of the product data returned from table
export type Product = {
  id?: number;
  name: string;
  price: number;
  category: string;
};

export class ProductStore {
  async index(): Promise<Product[]> {
    try {
      const conn: PoolClient = await client.connect();
      const sql: string = 'SELECT * FROM products';
      const result: QueryResult = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (err) {
        throw new Error(`Unable to get products from product table ------- ${err}`);
    }
  }

  async show(id: number): Promise<Product> {
    try {
      const conn: PoolClient = await client.connect();
      const sql: string = 'SELECT * FROM products WHERE id=($1)';
      const result: QueryResult = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (err) {
        throw new Error(`Unable to find product with id ${id}. ------- ${err}`);
    }
  }


  async showByCategory(category: string): Promise<Product> {
    try {
      const conn: PoolClient = await client.connect();
      const sql: string = 'SELECT * FROM products WHERE category=($1)';
      const result: QueryResult = await conn.query(sql, [category]);
      conn.release();
      return result.rows[0];
    } catch (err) {
        throw new Error(`Unable to find product with category ${category}. --------- ${err}`);
    }
  }


  async create(obj: Product): Promise<Product> {
    try {
      const conn: PoolClient = await client.connect();
      const sql ='INSERT INTO products (name, price, category) VALUES($1, $2, $3) RETURNING *';
      const result:QueryResult = await conn.query(sql, [obj.name, obj.price, obj.category]);
      conn.release();
      return result.rows[0];
    } catch (err) {
        throw new Error(`Unable to add the product ${obj.name}. --------- ${err}`);
    }
  }

  async delete1(id: string): Promise<Product> {
    try {
      const conn: PoolClient = await client.connect();
      const sql = 'DELETE FROM products WHERE id=($1)';
      const result: QueryResult = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (err) {
        throw new Error(`Unable to delete the product with id:${id}. --------${err}`);
    }
  }

}