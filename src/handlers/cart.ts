import express, { Request, Response } from 'express';
import { CartStore } from '../models/cart';
import { authenticate } from '../middleware/authenticator';

const store = new CartStore();

const index = async (_req: Request, res: Response) => {
  try{
    const carts = await store.index();
    res.json(carts);
  }catch (err) {
    res.status(400);
    res.json(err);
  }
};
  
const show = async (req: Request, res: Response) => {
  try{  
    const cart = await store.show(+req.params.id);
    res.json(cart);
  }catch (err) {
    res.status(400);
    res.json(err);
  }
};
  
const delete1 = async (req: Request, res: Response) => {
  try{  
    const deleted = await store.delete1(+req.params.id);
    res.json(deleted);
  }catch (err) {
    res.status(400);
    res.json(err);
  }
};

const getProductsByOrderId = async (req: Request, res: Response) => {
    try{
      const products = await store.getProductsByOrderId(req.params.id);
      res.json(products);
    }catch (err) {
      res.status(400);
      res.json(err);
    }
};

const addToCart = async (req: Request, res: Response) => {
    const orderId: string = req.body.orderId;
    const productId: string = req.body.productId;
    const quantity: number = parseInt(req.body.quantity);
  
    try {
      const addedProduct = await store.addToCart(quantity, orderId, productId);
      res.json(addedProduct);
    } catch (err) {
      res.status(400).json(`Problem in addToCart route. -------- ${err}`);
    }
};
  
const removeFromCart = async (req: Request, res: Response) => {
    const orderId: string = req.body.id;
    const productId: string = req.body.productId;
  
    try {
      const removedProduct = await store.removeFromCart(orderId, productId);
      res.json(removedProduct);
    } catch (err) {
      res.status(400).json(`Problem in removeFromCart route. -------- ${err}`);
    }
};

const cartRoutes = (app: express.Application) => {
    app.get('/carts', authenticate, index);
    app.get('/carts/:id', authenticate, show);
    app.delete('/carts/:id', authenticate, delete1);
    app.get('/carts/productByOrderId/:id', authenticate, getProductsByOrderId);
    app.post('/carts', authenticate, addToCart);
    app.delete('/carts/removeFromCart/:id', authenticate, removeFromCart);
  };
  
export default cartRoutes;