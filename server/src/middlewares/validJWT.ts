import { Response, NextFunction } from 'express';

const jwt = require('jsonwebtoken');

export const validJWT = (req: any, res: Response, next: NextFunction) => {
  //x-token headers
  const token = req.header('x-token');
  if (!token) {
    return res.status(401).json({
      ok: false,
    });
  }
  try {
    const { user } = jwt.verify(token, process.env.PRIVATE_KEY);
    // Save user to req.user
    req.user = user;
  } catch (err) {
    return res.status(401).json({
      ok: false,
      msg: 'Invalid token',
    });
  }

  next();
};
