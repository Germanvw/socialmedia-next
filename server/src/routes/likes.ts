import {
  handleLike,
  getLikeStatus,
  getTotalLikesPost,
  getTotalLikesUser,
} from '../controllers/likes';
import { validJWT } from '../middlewares/validJWT';
import express from 'express';
const router = express.Router();
router.use(validJWT);

router.post('/:id', handleLike);
router.get('/:id', getLikeStatus);
router.get('/post/:id', getTotalLikesPost);
router.get('/user/:id', getTotalLikesUser);
module.exports = router;
