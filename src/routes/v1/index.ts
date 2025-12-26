import { Router } from 'express';

import { router as webhook } from './webhook';
import { router as contacts } from './contacts';
import { router as products } from './products';
import { router as orders } from './orders';
import { router as invoices } from './invoices';

export const router = Router();

router.use('/webhook', webhook);
router.use('/contacts', contacts);
router.use('/products', products);
router.use('/orders', orders);
router.use('/invoices', invoices);
