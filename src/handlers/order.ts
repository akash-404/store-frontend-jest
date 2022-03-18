import express, { Request, Response } from 'express';
import { Order, OrderStore } from '../models/order';
import { authenticate } from '../middleware/authenticator';

const store = new OrderStore();

const index = async (_req: Request, res: Response) => {
  try{
    const orders = await store.index();
    res.json(orders);
  }catch (err) {
    res.status(400);
    res.json(err);
  }
};

const show = async (req: Request, res: Response) => {
  try{
    const order = await store.show(+req.params.id);
    res.json(order);
  }catch (err) {
    res.status(400);
    res.json(err);
  }
};

const getOrdersByUserId = async (req: Request, res: Response) => {
  try{
    const orders = await store.getOrdersByUserId(+req.params.id);
    res.json(orders);
  }catch (err) {
    res.status(400);
    res.json(err);
  }
};


const create = async (req: Request, res: Response) => {
  try {
    const order: Order = {
      status: req.body.status,
      userId: req.body.userId
    };
    const newOrder = await store.create(order);
    res.json(newOrder);
  } catch (err) {
    res.status(400).json(`Problem in create order route. -------- ${err}`);
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

const orderRoutes = (app: express.Application) => {
  app.get('/orders', authenticate, index);
  app.get('/orders/:id', authenticate, show);
  app.get('/orders/user/:id', authenticate, getOrdersByUserId);
  app.post('/orders', authenticate, create);
  app.delete('/orders/:id', authenticate, delete1);
};

export default orderRoutes;