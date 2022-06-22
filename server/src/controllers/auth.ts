import { Response } from 'express';
import {
  queryAuthLogin,
  queryAuthRegister,
  queryAuthUserUpdate,
  queryUserEmailExists,
} from '../db/querys/queryAuth';
import {
  queryFetchUserSingle,
  queryUserEmailUnique,
} from '../db/querys/queryUser';
import { createJWT } from '../helpers/createJWT';
import { hashPassword, isMatch } from '../helpers/password';
import { UserDataProps } from '../interfaces/interfaces';

const con = require('../db/db');

export const authUserUpdate = (req: any, res: Response) => {
  const { id } = req.user;
  const {
    username,
    email,
    firstname,
    lastname,
    age,
    gender,
    country,
    province,
  } = req.body;
  try {
    con.query(queryUserEmailUnique, [email], async (_: any, results: any[]) => {
      if (results.length === 0 || results[0].id === id) {
        con.query(
          queryAuthUserUpdate,
          [
            username,
            email,
            firstname,
            lastname,
            age,
            gender,
            country,
            province,
            id,
          ],
          async (_: any, { affectedRows }: any) => {
            if (affectedRows > 0) {
              // User updated
              con.query(
                queryFetchUserSingle,
                [id],
                async (_: any, results: any) => {
                  // Create token
                  const userUpdated = results[0];
                  const token = await createJWT(userUpdated);
                  return res.status(200).json({
                    ok: true,
                    user: userUpdated,
                    token,
                  });
                }
              );
            } else {
              return res
                .status(400)
                .json({ ok: false, msg: 'Error updating user information' });
            }
          }
        );
      } else {
        // email already exists
        return res.status(400).json({ ok: false, msg: 'Email already exists' });
      }
    });
  } catch (err) {
    return res.status(500).json({ ok: false, msg: 'Error on request' });
  }
};

export const authLogin = (req: any, res: Response) => {
  const { email, password } = req.body;
  try {
    con.query(
      queryAuthLogin,
      [email],
      async (err: any, results: UserDataProps[]) => {
        if (results.length > 0) {
          const userFound = results[0];
          const match = await isMatch(password, userFound.password!);
          if (match) {
            userFound.password = undefined;

            // Create JWT
            const token = await createJWT(userFound);

            return res.status(200).json({
              ok: true,
              user: { ...userFound },
              token,
            });
          } else {
            return res
              .status(400)
              .json({ ok: false, msg: 'Invalid password.' });
          }
        } else {
          return res
            .status(400)
            .json({ ok: false, msg: 'No user found.', err });
        }
      }
    );
  } catch (err) {
    return res.status(500).json({ ok: false, msg: 'Error on request' });
  }
};

export const authRegister = (req: any, res: Response) => {
  const {
    username,
    email,
    firstname,
    password,
    lastname,
    age,
    country,
    province,
    gender,
  } = req.body;
  try {
    // Email unique
    con.query(queryUserEmailExists, [email], async (_: any, results: any) => {
      if (results.length > 0) {
        return res
          .status(400)
          .json({ ok: false, msg: 'Email already exists.' });
      } else {
        const hashedPassword = await hashPassword(password);
        con.query(
          queryAuthRegister,
          [
            username,
            email,
            hashedPassword,
            firstname,
            lastname,
            age,
            country,
            province,
            gender,
          ],
          (err: any, results: any) => {
            if (results) {
              return res
                .status(201)
                .json({ ok: true, msg: 'User registered!' });
            } else {
              return res
                .status(400)
                .json({ ok: false, msg: 'Unable to register.', err });
            }
          }
        );
      }
    });
  } catch (error) {
    return res.status(500).json({ ok: false, msg: 'Error on request' });
  }
};

export const renewToken = async (req: any, res: any) => {
  const { user } = req;
  try {
    con.query(queryFetchUserSingle, [user.id], async (_: any, results: any) => {
      if (results.length > 0) {
        const refreshedUser = results[0];
        const token = await createJWT(refreshedUser);
        return res.status(200).json({
          ok: true,
          user: { ...refreshedUser },
          token,
        });
      } else {
        return res.status(400).json({ ok: false, msg: 'User not found.' });
      }
    });
  } catch (err) {
    return res.status(500).json({ ok: false, msg: 'Error on request' });
  }
};
