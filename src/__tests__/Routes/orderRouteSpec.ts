import supertest from 'supertest';
import app from '../../server';
import { User, UserStore } from '../../models/users';
import { Order, OrderStore } from '../../models/order';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';


dotenv.config();
const request = supertest(app);
const store = new UserStore();

let token: string;
let orderId: number;
const order: Order = {
    status: 'Active'
}

describe("Order endpoints tests", () => {
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
            throw new Error(`Unable to run test --------${err}`);
        }
      });

    it("should create new order", async () => {
        try{
            const response = await request.post('/orders').send(order).set('Authorization', token);
            expect(response.status).toBe(200);
            orderId = response.body.id;

        }catch (err) {
            throw new Error(`Unable to run test --------${err}`);
        }
    });
    
    it("should get order info", async () => {
        try{
            const response = await request.get(`/orders/${orderId}`).set('Authorization', token);
          expect(response.status).toBe(200);
        }catch (err) {
            throw new Error(`Unable to run test --------${err}`);
        }
      });
    
      it("should get list of orders", async () => {
        try{
            const response = await request.get('/orders').set('Authorization', token);
          expect(response.status).toBe(200);
        }catch (err) {
            throw new Error(`Unable to run test --------${err}`);
        }
      });

      it("should delete order", async () => {
        try{
            const response = await request.delete(`/orders/${orderId}`).set('Authorization', token);
            expect(response.status).toBe(200);
        }catch (err) {
            throw new Error(`Unable to run test --------${err}`);
        }
      });
    
});