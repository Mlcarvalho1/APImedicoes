import { Router } from 'express';
import controller from '../controllers/User';

import loginRequired from '../middlewares/loginRequired';
import Validate from '../middlewares/validateSchema';
import UserSchema from '../schemas/UserSchema';

const router = new Router();

router.get('/:id?', Validate(UserSchema.show), controller.index);
router.post('/', Validate(UserSchema.store), controller.store);
router.put('/', Validate(UserSchema.update), loginRequired, controller.update);
router.delete('/', Validate(UserSchema.delete), loginRequired, controller.delete);

export default router;
