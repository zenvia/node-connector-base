import { Router } from 'express';
import { contactsController } from '../../controllers';

export const router = Router();

router.route('/')
  .get(contactsController.list.bind(contactsController));

router.route('/:batchId')
  .get(contactsController.get.bind(contactsController));

router.route('/')
  .post(contactsController.create.bind(contactsController));
