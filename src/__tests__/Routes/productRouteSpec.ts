import supertest from 'supertest';
import app from '../../server';
import { User, UserStore } from '../../models/users';
import { Product } from '../../models/product';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const request = supertest(app);
const store = new UserStore();

let token: string;
const product: Product = {
    name: 'Oneplus 6T',
    price: 35000,
    category: 'Mobile',
  }

describe("Product endpoint tests", () => {
  beforeAll( async() => {
    try{
      const user: User = {
        username: 'test1',
        firstname: 'test2',
        lastname: 'test3',
        password: 'password'
        }
        const newUser = await store.create(user);
        if (process.env.TOKEN_SECRET) {
          token = jwt.sign({ user: newUser }, process.env.TOKEN_SECRET);
          token = 'Bearer '+token;
        }
      }catch (err) {
        throw new Error(`Unable to run endpoint test --------${err}`);
    }
  });

    it("should create new product", async () => {
        try{
          const response = await request.post('/products').send(product).set('Authorization', token);
          expect(response.status).toBe(200);
        }
      catch (err) {
            throw new Error(`Unable to run create test --------${err}`);
        }
      });
      
      it("should get product info", async () => {
        try{
          const response = await request.get('/products/1');
          expect(response.status).toBe(200);
        }
      catch (err) {
            throw new Error(`Unable to run create test --------${err}`);
        }
      });
    
      it("should get list of products", async () => {
        try{
          const response = await request.get('/products');
          expect(response.status).toBe(200);
        }catch (err) {
            throw new Error(`Unable to run test --------${err}`);
        }
      });
    
      it("should delete product", async () => {
        try{
          const response = await request.delete('/products/1').set('Authorization', token);
          expect(response.status).toBe(200);
        }catch (err) {
            throw new Error(`Unable to run test --------${err}`);
        }
      });
});
