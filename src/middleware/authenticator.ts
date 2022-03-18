import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

export const authenticate = (req: Request, res: Response, next: Function) => {
  try {
    if (req.headers.authorization) {
      const header: string = req.headers.authorization;
      const token: string = header.split(' ')[1];
      jwt.verify(token, process.env.TOKEN_SECRET!);
      next();
    } else {
      throw new Error('Authorization token is not present');
    }
  } catch (err) {
    res.status(401).send(`Authentication Failure ------- ${err}`);
  }
};