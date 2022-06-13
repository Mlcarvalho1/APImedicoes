import { Router } from 'express';
import controller from '../controllers/MeasurementController';
import loginRequired from '../middlewares/loginRequired';
import Validate from '../middlewares/validateSchema';
import measurementSchema from '../schemas/measurementSchema';

const router = new Router();

router.get('/:patient_id', Validate(measurementSchema.index), loginRequired, controller.index);
router.get('/:patient_id/chart', Validate(measurementSchema.listChart), loginRequired, controller.listChart);
router.post('/:patient_id', Validate(measurementSchema.store), loginRequired, controller.store);
router.put('/:patient_id/:id', Validate(measurementSchema.update), loginRequired, controller.update);
router.delete('/:patient_id/:id', Validate(measurementSchema.delete), loginRequired, controller.delete);

export default router;
