import { Router } from 'express';
import economyControllers from '../../controllers/economyControllers/last';

const router = Router();
router.get('/', economyControllers.getLast);

export default router;
