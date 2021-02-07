import express from 'express';
const router = express.Router();
import { UserController } from '../controller/user.controller';
import validate from '../validate/user.validate';
import authMiddleware from '../middleware/auth.middleware';

router.post('/signup', validate.createUser, UserController.createUser);
router.post('/login', validate.login, UserController.login);
router.get('/profile/:id', authMiddleware(), UserController.getUser);

module.exports = router;
