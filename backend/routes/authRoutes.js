import express from 'express';
import { register, login, logout, getCurrentUser, editProfile } from '../controller/authController.js';
import { protect } from '../middleware/authMiddleware.js';
const router = express.Router();


router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);
router.get('/me', protect, getCurrentUser);
router.put('/edit', protect, editProfile);

export default router;