import {
  authLogin,
  authRegister,
  authUserUpdate,
  renewToken,
} from '../controllers/auth';
import { validJWT } from '../middlewares/validJWT';
import express from 'express';

const router = express.Router();
router.post('/', authLogin);
router.post('/register', authRegister);
router.post('/user', validJWT, authUserUpdate);
router.get('/', validJWT, renewToken);

module.exports = router;
