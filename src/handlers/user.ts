import express, { Request, Response } from 'express';
import { User, UserStore } from '../models/users';
import jwt from 'jsonwebtoken';
import { authenticate } from '../middleware/authenticator';
const store = new UserStore();

const index = async (_req: Request, res: Response) => {
  try{
    const users = await store.index();
    res.json(users);
  }catch (err) {
    res.status(400);
    res.json(err);
  }
};

const show = async (req: Request, res: Response) => {
  try{
    const user = await store.show(+req.params.id);
    res.json(user);
  }catch (err) {
    res.status(400);
    res.json(err);
  }
};

const create = async (req: Request, res: Response) => {
  const user: User = {
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    username: req.body.username,
    password: req.body.password
  };
  try {
    const newUser = await store.create(user);
    var token = jwt.sign({ user: newUser }, process.env.TOKEN_SECRET!);
    newUser.token = token;
    res.json(newUser);
  } catch (err) {
    res.status(400).json(`Problem in create user route. -------- ${err}`);
  }
};

const authorise = async (req: Request, res: Response) => {
  if (!req.body.username || !req.body.password) {
    res.status(401).send('Error: Username or Password missing')
  }
  const user: User = {
    username: req.body.username,
    password: req.body.password
  };
  try {
    const u = await store.authorise(user.username, user.password);
    var token = jwt.sign({ user: u }, process.env.TOKEN_SECRET!);
    res.json(token);
  } catch (err) {
    res.status(401).json(`Problem in authorise user route. -------- ${err}`);
  }
};

const delete1 = async (req: Request, res: Response) => {
  try{
    const deleted = await store.delete1(req.params.id);
    res.json(deleted);
  }catch (err) {
    res.status(400);
    res.json(err);
  }
};

const userRoutes = (app: express.Application) => {
  app.get('/users', authenticate, index);
  app.get('/users/:id', authenticate, show);
  app.post('/users', create);
  app.post('/users/authenticate', authorise);
  app.delete('/users/:id', authenticate, delete1);
};

export default userRoutes;