import { UserDataProps } from '../interfaces/interfaces';

const jwt = require('jsonwebtoken');

export const createJWT = (user: UserDataProps) => {
  return new Promise((resolve, reject) => {
    const payload = { user };
    jwt.sign(
      payload,
      process.env.PRIVATE_KEY,
      {
        expiresIn: '24h',
      },
      (err: string, token: string) => {
        if (err) {
          reject('Cannot generate token');
        }
        resolve(token);
      }
    );
  });
};
