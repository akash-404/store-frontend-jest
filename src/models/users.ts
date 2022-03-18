import { PoolClient, QueryResult } from 'pg';
import client from '../database';
import bcrypt from 'bcrypt'

export type User = {
  id?: number;
  username: string;
  firstname?: string;
  lastname?: string;
  password: string;
  token?: string;
};

export class UserStore {
  async index(): Promise<User[]> {
    try {
      const conn: PoolClient = await client.connect();
      const sql: string = 'SELECT * FROM users';
      const result: QueryResult = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (err) {
        throw new Error(`Unable to get users from users table. -------- ${err}`);
    }
  }

  async show(id: number): Promise<User> {
    try {
      const conn: PoolClient = await client.connect();
      const sql: string = 'SELECT * FROM users WHERE id=($1)';
      const result:QueryResult = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (err) {
        throw new Error(`unable to find the user with id: ${id}. ---------- ${err}`);
    }
  }

  async delete1(id: string): Promise<User> {
    try {
      const conn: PoolClient = await client.connect();
      const sql: string = 'DELETE FROM users WHERE id=($1)';
      const result: QueryResult = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (err) {
        throw new Error(`Unable to delete user with id: ${id}. --------- ${err}`);
    }
  }

  async create(obj: User): Promise<User> {
    try {
      const conn: PoolClient = await client.connect();
      const sql = 'INSERT INTO users (username, firstname, lastname, password) VALUES($1, $2, $3, $4) RETURNING *';
      const encypted_password: string = bcrypt.hashSync(obj.password + process.env.BCRYPT_PASSWORD, parseInt(process.env.SALT_ROUNDS as unknown as string));
      const result: QueryResult = await conn.query(sql, [obj.username, obj.firstname, obj.lastname, encypted_password]);
      conn.release();
      return result.rows[0];
    } catch (err) {
        throw new Error(`Unable to create user: ${obj.username} ---------- ${err}`);
    }
  }

  async authorise(username: string, password: string): Promise<User> {
    try{
        
      const conn : PoolClient= await client.connect();
      const sql: string = 'SELECT password FROM users WHERE username=($1)';
      const result: QueryResult = await conn.query(sql, [username]);
      if (!result.rows.length) {
        throw new Error('Username not found');
      }
      const user = result.rows[0];
      if(bcrypt.compareSync(password + process.env.BCRYPT_PASSWORD, user.password)){
          return user;
      }else{
          throw new Error('Invalid username or password');
      }
    }catch (err) {
      throw new Error(`Unable to authorise ---------- ${err}`);
    }
  }
}