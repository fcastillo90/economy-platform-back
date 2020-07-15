import { Router } from 'express';
import economyControllers from '../../controllers/economyControllers/values';

const router = Router();
router.get('/:key', economyControllers.getValues);

export default router;
