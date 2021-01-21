import express from 'express';
const router = express.Router();
import { UserController } from '../controller/user.controller.js';

router.post('/signup', UserController.createUser);

module.exports = router;
