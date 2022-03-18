import { PoolClient, QueryResult } from 'pg';
import client from '../database';

export type Order = {
  id?: number;
  status: string;
  userId?: number;
};

export class OrderStore {
  async index(): Promise<Order[]> {
    try {
      const conn: PoolClient = await client.connect();
      const sql: string = 'SELECT * FROM orders';
      const result:QueryResult = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (err) {
        throw new Error(`Unable to get orders from order table. ---------- ${err}`);
    }
  }

  async show(id: number): Promise<Order> {
    try {
      const conn: PoolClient = await client.connect();
      const sql: string = 'SELECT * FROM orders WHERE id=($1)';
      const result: QueryResult = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (err) {
        throw new Error(`Unable to find order with id: ${id} ---------- ${err}`);
    }
  }

  async getOrdersByUserId(userId: number): Promise<Order[]> {
    try {
      const conn: PoolClient = await client.connect();
      const sql:string = 'SELECT * FROM orders WHERE userId=($1)';
      const result: QueryResult = await conn.query(sql, [userId]);
      conn.release();
      return result.rows;
    } catch (err) {
        throw new Error(`Unable to find order for userId:${userId}. ---------- ${err}`);
    }
  }

  async create(obj: Order): Promise<Order> {
    try {
      const conn:PoolClient = await client.connect();
      const sql: string ='INSERT INTO orders (status, userId) VALUES($1, $2) RETURNING *';
      const result: QueryResult = await conn.query(sql, [obj.status, obj.userId]);
      conn.release();
      return result.rows[0];
    } catch (err) {
        throw new Error(`Unable to add new order. ----------- ${err}`);
    }
  }

  async delete1(id: number): Promise<Order> {
    try {
      const conn:PoolClient = await client.connect();
      const sql: string = 'DELETE FROM orders WHERE id=($1)';
      const result: QueryResult = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (err) {
        throw new Error(`Unable to delete order with id: ${id}. --------- ${err}`);
    }
  }
}