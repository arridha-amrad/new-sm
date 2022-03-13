import { Router } from 'express';
import createReplyCommentController from '../controllers/replyComment/createReplyCommentController';
import deleteReplyCommentController from '../controllers/replyComment/deleteReplyCommentController';
import { verifyAccessToken } from '../services/JwtServices';

const router = Router();

router.post('/:commentId', verifyAccessToken, createReplyCommentController);
router.delete('/:replyId', verifyAccessToken, deleteReplyCommentController);

export default router;
