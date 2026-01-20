import * as config from 'config';
import { ContactsController } from './contacts-controller';
import { ProductsController } from './products-controller';
import { OrdersController } from './orders-controller';
import { InvoiceController } from './invoices-controller';
import { contactCsvStrategy, invoiceCsvStrategy, orderCsvStrategy, productCsvStrategy } from '../strategies';
import { IZenApiConfig } from '../models/zen-api';

const zenApiConfig = config.get<IZenApiConfig>('ZenApi');

const contactsController = new ContactsController(zenApiConfig, contactCsvStrategy);
const productsController = new ProductsController(zenApiConfig, productCsvStrategy);
const ordersController = new OrdersController(zenApiConfig, orderCsvStrategy);
const invoicesController = new InvoiceController(zenApiConfig, invoiceCsvStrategy);

export {
    contactsController,
    productsController,
    ordersController,
    invoicesController,
};
