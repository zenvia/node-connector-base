import { Router } from 'express';
import { ordersController } from '../../controllers';

export const router = Router();

router.route('/')
  .get(ordersController.list.bind(ordersController));

router.route('/:batchId')
  .get(ordersController.get.bind(ordersController));

router.route('/')
  .post(ordersController.create.bind(ordersController));
