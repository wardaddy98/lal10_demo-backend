import express from 'express';
import { isLoggedIn } from '../../middlewares/authMiddlewares.js';
import { getTodos } from './controller.js';
const router = express.Router();

router.get('/', isLoggedIn, getTodos);

export default router;
