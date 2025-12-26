import { Router } from 'express';
import { invoicesController } from '../../controllers';

export const router = Router();

router.route('/')
  .get(invoicesController.list.bind(invoicesController));

router.route('/:batchId')
  .get(invoicesController.get.bind(invoicesController));

router.route('/')
  .post(invoicesController.create.bind(invoicesController));
