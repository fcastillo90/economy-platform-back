import { Router } from 'express';
import versionController from '../../controllers/versionControllers';

const router = Router();
router.get('/', async (req, res, next) => {
  try {
    const version = versionController.getVersion();
    const env = process.env.ENVIRONMENT_TYPE;
    return res.json({
      ...version,
      environment: env
    });
  } catch (error) {
    return next(error);
  }
});

export default router;
