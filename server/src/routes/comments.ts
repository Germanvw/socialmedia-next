import express from 'express';
import {
  createComment,
  deleteComment,
  fetchCommentsByPost,
} from '../controllers/comments';
import { validJWT } from '../middlewares/validJWT';
const router = express.Router();
router.use(validJWT);

router.post('/:id', createComment);
router.get('/:id', fetchCommentsByPost);
router.delete('/:id', deleteComment);

module.exports = router;
