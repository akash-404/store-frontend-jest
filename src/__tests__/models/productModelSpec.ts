import { Product, ProductStore } from '../../models/product';

const store = new ProductStore();
const product: Product = {
    name: 'Oneplus 6T',
    price: 35000,
    category: 'Mobile'
  }

let productId:number;

describe("PRODUCT MODEL TESTS", () => {

  it("should create new product", async () => {
    try{
      const result = await store.create(product);
      expect(result.name).toBe(product.name);
      productId = result.id as unknown as number;
  }catch (err) {
    throw new Error(`Unable to run test --------${err}`);
  }
  });

  it("should return all products", async () => {
    try{
      const result = await store.index();
      expect(result.length).toBeGreaterThan(0);
  }catch (err) {
    throw new Error(`Unable to run test --------${err}`);
  }
  });

  it("should return product of given ID", async () => {
    try{
      const result = await store.show(productId);
      expect(result.id).toBe(productId);
  }catch (err) {
    throw new Error(`Unable to run test --------${err}`);
  }
  });

  it("should delete product", async () => {
    try{
      const result = await store.delete1(productId.toString());
      expect(store.show(productId)).toBeFalsy;
  }catch (err) {
    throw new Error(`Unable to run test --------${err}`);
  }
  });
});