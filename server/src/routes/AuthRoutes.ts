import Express from 'express';
import emailVerification from '../controllers/authentication/emailVerification';
import forgotPassword from '../controllers/authentication/forgotPassword';
import login from '../controllers/authentication/login';
import logout from '../controllers/authentication/logout';
import refreshToken from '../controllers/authentication/refreshToken';
import register from '../controllers/authentication/register';
import resetPassword from '../controllers/authentication/resetPassword';

import googleOauth from '../controllers/authentication/googleAuthController';
import { verifyAccessToken } from '../services/JwtServices';

// eslint-disable-next-line new-cap
const router = Express.Router();

router.post('/login', login);
router.post('/register', register);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password/:token', resetPassword);
router.get('/email-verification/:token', emailVerification);
router.get('/refresh-token', refreshToken);
router.post('/logout', verifyAccessToken, logout);
router.get('/google', googleOauth);

export default router;
