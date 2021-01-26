import express from 'express';
const router = express.Router();
import { UserController } from '../controller/user.controller.js';

router.post('/signup', UserController.createUser);
router.post('/login', UserController.login);

module.exports = router;
