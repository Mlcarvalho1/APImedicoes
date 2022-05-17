import { Router } from 'express';
import controller from '../controllers/User';

import loginRequired from '../middlewares/loginRequired';

const router = new Router();

router.get('/', loginRequired, controller.index);
router.get('/:id', controller.show);
router.post('/', controller.store);
router.put('/', loginRequired, controller.update);
router.delete('/', loginRequired, controller.delete);

export default router;
