import { Router } from 'express';
import { createReply } from '../controllers/ReplyController';
import { verifyAccessToken } from '../services/JwtServices';

const router = Router();

router.post('/', verifyAccessToken, createReply);

export default router;
