import supertest from 'supertest';
import app from '../../server';
import { User, UserStore } from '../../models/users';

let token: string;
const request = supertest(app);

const user: User = {
    username: 'test1',
    firstname: 'test2',
    lastname: 'test3',
    password: 'password'
}

describe("User endpoint tests", () => {

  it("should create new user", async () => {

    try{
      const response = await request.post('/users').send(user);
      console.log(response.status);
      token = response.body.token;
      token = 'Bearer ' + token
      expect(response.status).toBe(200);
      
    }catch (err) {
      throw new Error(`Unable to test create new user. --------${err}`);
    }
  });

  it("should get list of users", async () => {
    try{
      const response = await request.get('/users').set('Authorization', token);
      expect(response.status).toBe(200);
    }catch (err) {
      throw new Error(`Unable to run index test --------${err}`);
    }
  });

  it("should get user info", async () => {
    try{
      const response = await request.get('/users/1').set('Authorization', token);
      expect(response.status).toBe(200);
    }catch (err) {
      throw new Error(`Unable to run show test --------${err}`);
    }
  });


  it("should delete user", async () => {
    try{
      const response = await request.delete('/users/1').set('Authorization', token);
      expect(response.status).toBe(200);
    }catch (err) {
      throw new Error(`Unable to run delete test --------${err}`);
    }
  });
});