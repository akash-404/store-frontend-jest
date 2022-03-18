import { PoolClient, QueryResult } from 'pg';
import client from '../database';

//creating return type of the product data returned from table
export type Cart = {
  id: number;
  quantity: number;
  order_id: number;
  product_id: string;
};

export class CartStore {
  async index(): Promise<Cart[]> {
    try {
      const conn: PoolClient = await client.connect();
      const sql: string = 'SELECT * FROM cart';
      const result: QueryResult = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (err) {
        throw new Error(`Unable to get orders from cart table ------- ${err}`);
    }
  }

  async show(id: number): Promise<Cart> {
    try {
      const conn: PoolClient = await client.connect();
      const sql: string = 'SELECT * FROM cart WHERE id=($1)';
      const result: QueryResult = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (err) {
        throw new Error(`Unable to find cart with id ${id}. ------- ${err}`);
    }
  }


  async getProductsByOrderId(orderId: string): Promise<Cart[]> {
    try {
      const conn: PoolClient = await client.connect();
      const sql: string = 'SELECT * FROM products WHERE id IN (SELECT product_id FROM cart WHERE order_id=($1))';
      const result:QueryResult = await conn.query(sql, [orderId]);
      conn.release();
      return result.rows;
    } catch (err) {
        throw new Error(`Unable to find product with orderId : ${orderId}. ----------- ${err}`);
    }
  }

  async addToCart(quantity: number, orderId: string, productId: string): Promise<Cart>{
    try {
      const conn: PoolClient = await client.connect();
      const sql: string ='INSERT INTO cart (quantity, order_id, product_id) VALUES($1, $2, $3) RETURNING *';
      const result = await conn.query(sql, [quantity, orderId, productId]);
      conn.release();
      return result.rows[0];
    } catch (err) {
        throw new Error(`Unable to add product ${productId} to order ${orderId}. ---------- ${err}`);
    }
  }

  async removeFromCart(orderId: string, productId: string): Promise<Cart> {
    try {
      const conn: PoolClient = await client.connect();
      const sql: string ='DELETE FROM cart WHERE order_id = ($1) AND product_id = ($2)';
      const result = await conn.query(sql, [orderId, productId]);
      conn.release();
      return result.rows[0];
    } catch (err) {
        throw new Error(`Unable to remove product ${productId} from order ${orderId}. ---------- ${err}`);
    }
  }

  async delete1(id: number): Promise<Cart> {
    try {
      const conn: PoolClient = await client.connect();
      const sql = 'DELETE FROM cart WHERE id=($1)';
      const result: QueryResult = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (err) {
        throw new Error(`Unable to delete the cart with id:${id}. --------${err}`);
    }
  }



}