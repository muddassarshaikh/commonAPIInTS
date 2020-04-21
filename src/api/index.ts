import v1Router from './v1.0/index';
import express from 'express';
const router = express.Router();

router.use('/v1.0', v1Router);

export default router;
