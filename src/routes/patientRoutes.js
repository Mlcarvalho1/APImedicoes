import { Router } from 'express';
import controller from '../controllers/PatientController';
import loginRequired from '../middlewares/loginRequired';

const router = new Router();

router.get('/', controller.index);
router.post('/', loginRequired, controller.store);
router.put('/', loginRequired, controller.update);
router.get('/', controller.show);
router.delete('/', loginRequired, controller.delete);

export default router;
