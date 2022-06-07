import { Router } from 'express';
import controller from '../controllers/Home';

const router = new Router();

router.get('/', controller.index);

export default router;
