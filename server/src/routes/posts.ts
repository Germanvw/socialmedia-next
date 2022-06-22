import express from 'express';
import {
  deletePost,
  fetchAllPosts,
  fetchAllPostUser,
  fetchPostById,
  fetchPostFavorite,
  isFavoriteByUser,
  postHandleFavorite,
} from '../controllers/posts';
import { validJWT } from '../middlewares/validJWT';
import { createPost } from '../controllers/posts';
const router = express.Router();

router.use(validJWT);

router.get('/user/:id', fetchAllPostUser);
router.get('/:id', fetchPostById);
router.get('/', fetchAllPosts);
router.post('/', createPost);
router.delete('/:id', deletePost);
router.get('/favorite/user', fetchPostFavorite);
router.get('/favoritebyuser/:id', isFavoriteByUser);
router.post('/favorite/:id', postHandleFavorite);

module.exports = router;
