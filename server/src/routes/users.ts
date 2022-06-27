import express from 'express';
import {
  fetchUserAll,
  fetchUserByName,
  fetchUserSingle,
} from '../controllers/users';
const router = express.Router();

router.get('/', fetchUserAll);
router.get('/:id', fetchUserSingle);
router.get('/name/:id', fetchUserByName);

module.exports = router;
