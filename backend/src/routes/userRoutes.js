import { Router } from 'express';
import Usercontroller from '../controllers/User';

import loginRequired from '../middlewares/loginRequired';
import Validate from '../middlewares/validateSchema';
import UserSchema from '../schemas/UserSchema';

const router = new Router();

router.get('/:id?', Validate(UserSchema.show), Usercontroller.index);
router.post('/', Validate(UserSchema.store), Usercontroller.store);
router.put('/', Validate(UserSchema.update), loginRequired, Usercontroller.update);
router.delete('/', Validate(UserSchema.delete), loginRequired, Usercontroller.delete);

export default router;
