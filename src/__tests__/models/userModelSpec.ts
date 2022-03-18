import { User, UserStore } from '../../models/users';

const store = new UserStore();
const user: User = {
  username: 'test1',
  firstname: 'test2',
  lastname: 'test3',
  password: 'password'
  }

let userID:number;

describe("User MODEL TESTS", () => {

  it("should create new user", async () => {
      try{
      const result = await store.create(user);
      expect(result.username).toBe(user.username);
      userID = result.id as unknown as number
      }catch (err) {
        throw new Error(`Unable to run test --------${err}`);
      }
  });

  it("should return all users", async () => {
    try{
      const result = await store.index();
    expect(result.length).toBeGreaterThan(0);
}catch (err) {
    throw new Error(`Unable to run test --------${err}`);
  }
  });

  it("should return user of given ID", async () => {
      try{
        const result = await store.show(userID);
        expect(result.id).toBe(userID);
      }catch (err) {
        throw new Error(`Unable to run test --------${err}`);
      }
  });

  it("should delete user", async () => {
      try{
        const result = await store.delete1(userID.toString());
        expect(store.show(userID)).toBeFalsy;
}catch (err) {
    throw new Error(`Unable to run test --------${err}`);
  }
  });
});