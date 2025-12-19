import * as config from 'config';
import { controller as messageController } from './sms-sender-message-controller';
import { controller as webhookController } from './sms-receiver-webhook-controller';
import { ContactsController } from './contacts-controller';
import { ProductsController } from './products-controller';
import { OrdersController } from './orders-controller';
import { InvoiceController } from './invoices-controller';
import { contactCsvStrategy, invoiceCsvStrategy, orderCsvStrategy, productCsvStrategy } from '../strategies';

const zenApiConfig = config.get('ZenApi');

const contactsController = new ContactsController(zenApiConfig, contactCsvStrategy);
const productsController = new ProductsController(zenApiConfig, productCsvStrategy);
const ordersController = new OrdersController(zenApiConfig, orderCsvStrategy);
const invoicesController = new InvoiceController(zenApiConfig, invoiceCsvStrategy);

export {
    messageController,
    webhookController,
    contactsController,
    productsController,
    ordersController,
    invoicesController,
};
