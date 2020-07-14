import { Router } from 'express';
import Version from './version';

const router = Router();
router.use('/', Version);

export default router;
