import { Router } from 'express';
import controller from '../controllers/TokenController';

const router = new Router();

router.post('/', controller.login);

export default router;
