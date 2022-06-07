import { Router } from 'express';
import loginRequired from '../middlewares/loginRequired';

import controller from '../controllers/FotoController';

const router = new Router();

router.post('/', loginRequired, controller.store);

export default router;
