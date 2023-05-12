import express from 'express';
import loginRouter from './login/routes.js';
import registerRouter from './register/routes.js';
const router = express.Router();

router.use('/login', loginRouter);
router.use('/register', registerRouter);

export default router;
