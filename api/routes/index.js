import { Router } from 'express';
import Version from './versionRoutes';
import economyRoutes from './economyRoutes';

const router = Router();
router.use('/version', Version);
router.use('/economy', economyRoutes);
export default router;
