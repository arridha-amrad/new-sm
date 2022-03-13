import express from 'express';
import createCommentController from '../controllers/comment/createCommentController';
import deleteCommentController from '../controllers/comment/deleteCommentController';
import likeCommentController from '../controllers/comment/likeCommentController';
import updateCommentController from '../controllers/comment/updateCommentController';
import { verifyAccessToken } from '../services/JwtServices';

const router = express.Router();

router.post('/comment/:postId', verifyAccessToken, createCommentController);
router.post(
  '/comment/like/:commentId',
  verifyAccessToken,
  likeCommentController
);

router.delete(
  '/comment/:commentId',
  verifyAccessToken,
  deleteCommentController
);

router.put('/comment/:commentId', verifyAccessToken, updateCommentController);

export default router;
