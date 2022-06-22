import express from 'express';
import { fetchUserAll, fetchUserSingle } from '../controllers/users';
const router = express.Router();

router.get('/', fetchUserAll);
router.get('/:id', fetchUserSingle);

module.exports = router;
