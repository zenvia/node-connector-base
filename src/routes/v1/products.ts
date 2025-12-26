import { Router } from 'express';
import { productsController } from '../../controllers';

export const router = Router();

router.route('/')
  .get(productsController.list.bind(productsController));

router.route('/:batchId')
  .get(productsController.get.bind(productsController));

router.route('/')
  .post(productsController.create.bind(productsController));
