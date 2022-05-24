import { Router } from 'express';
import controller from '../controllers/PatientController';
import loginRequired from '../middlewares/loginRequired';
import Validate from '../middlewares/validateSchema';
import PatientSchema from '../schemas/PatientSchema';

const router = new Router();

router.get('/', loginRequired, controller.index);
router.post('/', Validate(PatientSchema.store), loginRequired, controller.store);
router.put('/:id', Validate(PatientSchema.update), loginRequired, controller.update);
router.get('/:id', Validate(PatientSchema.show), loginRequired, controller.show);
router.delete('/:id', Validate(PatientSchema.delete), loginRequired, controller.delete);

export default router;
