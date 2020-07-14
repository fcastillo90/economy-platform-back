import { Router } from 'express';
import lastEP from './lastEP';
import valuesEP from './valuesEP';
import dateEP from './dateEP';

const router = Router();
router.use('/last', lastEP);
router.use('/values', valuesEP);
router.use('/date', dateEP);

export default router;
