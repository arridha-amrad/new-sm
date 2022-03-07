import { Router } from 'express';
import { createReply, removeReply } from '../controllers/ReplyController';
import { verifyAccessToken } from '../services/JwtServices';

const router = Router();

router.post('/:commentId', verifyAccessToken, createReply);
router.delete('/:replyId', verifyAccessToken, removeReply);

export default router;
