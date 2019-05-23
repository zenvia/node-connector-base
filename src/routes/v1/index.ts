import { Router } from 'express';
import { router as webhook } from './webhook';

export const router = Router();

router.use('/webhook', webhook);
