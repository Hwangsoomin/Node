import express from 'express';
const router = express.Router();
import { UserController } from '../controller/user.controller.js';
import validate from '../validate/user.validate.js';

router.post('/signup', validate.createUser, UserController.createUser);
router.post('/login', validate.login, UserController.login);

module.exports = router;
