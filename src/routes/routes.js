import express from 'express';
import loginRouter from './login/routes.js';
import registerRouter from './register/routes.js';
import todosRouter from './todos/routes.js';
const router = express.Router();

router.use('/login', loginRouter);
router.use('/register', registerRouter);
router.use('/todos', todosRouter);

export default router;
