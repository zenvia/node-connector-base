import * as config from 'config';
import { controller as messageController } from './sms-sender-message-controller';
import { controller as webhookController } from './sms-receiver-webhook-controller';
import { ContactsController } from './contacts-controller';
import { ProductsController } from './products-controller';
import { OrdersController } from './orders-controller';
import { InvoiceController } from './invoices-controller';

const zenApiConfig = config.get('ZenApi');

const contactsController = new ContactsController(zenApiConfig);
const productsController = new ProductsController(zenApiConfig);
const ordersController = new OrdersController(zenApiConfig);
const invoicesController = new InvoiceController(zenApiConfig);

export {
    messageController,
    webhookController,
    contactsController,
    productsController,
    ordersController,
    invoicesController,
};
