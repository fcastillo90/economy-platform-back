import { Router } from 'express';
import economyControllers from '../../controllers/economyControllers/date';

const router = Router();
router.get('/:key/:date', economyControllers.getDate);

export default router;
