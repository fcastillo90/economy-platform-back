import { Router } from 'express';
import economyControllers from '../../controllers/economyControllers/helloWorld';

const router = Router();
router.get('/', economyControllers.getHelloWorld);

export default router;
