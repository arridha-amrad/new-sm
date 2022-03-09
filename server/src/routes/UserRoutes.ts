import { Router } from 'express';
import me from '../controllers/user/me';
import { verifyAccessToken } from '../services/JwtServices';

// eslint-disable-next-line new-cap
const router = Router();

router.get('/me', verifyAccessToken, me);

export default router;
