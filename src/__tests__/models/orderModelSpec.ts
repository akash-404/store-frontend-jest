import { Order, OrderStore } from '../../models/order';

const store = new OrderStore();
const order: Order = {
    status: 'Active'
  }

let orderId: number;

describe("ORDER MODEL TESTS", () => {
    it("should create new order", async () => {
      try{
        const result = await store.create(order);
        expect(result.status).toEqual('Active');
        orderId = result.id as unknown as number;
    }catch (err) {
        throw new Error(`Unable to run test --------${err}`);
    }
    });

    it("should return all orders", async () => {
      try{
        const result = await store.index();
        expect(result.length).toBeGreaterThan(0);
        
    }catch (err) {
        throw new Error(`Unable to run test --------${err}`);
    }
    });

    it("should return order of given ID", async () => {
      try{
        const result = await store.show(orderId);
        expect(result.id).toBe(orderId);
    }catch (err) {
        throw new Error(`Unable to run test --------${err}`);
    }
    });

    it("should delete order", async () => {
      try{
        const result = await store.delete1(orderId);
        expect(store.show(orderId)).toBeFalsy;
    }catch (err) {
        throw new Error(`Unable to run test --------${err}`);
    }
    });
});