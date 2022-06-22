import express from 'express';
import {
  addFriend,
  removeFriend,
  createFriendRequest,
  responseFriendRequest,
  fetchAllFriend,
  fetchFriendRequestReceived,
} from '../controllers/friend';
import { validJWT } from '../middlewares/validJWT';
const router = express.Router();
router.use(validJWT);

router.post('/req', createFriendRequest);
router.put('/req/:id', responseFriendRequest);
router.get('/req', fetchFriendRequestReceived);
router.post('/', addFriend);
router.put('/', removeFriend);
router.get('/', fetchAllFriend);

module.exports = router;
