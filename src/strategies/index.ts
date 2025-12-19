import { ContactCsvStrategy } from "./contact-csv-strategy";
import { InvoiceCsvStrategy } from "./invoice-csv-strategy";
import { OrderCsvStrategy } from "./order-csv-strategy";
import { ProductCsvStrategy } from "./product-csv-strategy";

export const contactCsvStrategy = new ContactCsvStrategy();
export const productCsvStrategy = new ProductCsvStrategy();
export const orderCsvStrategy = new OrderCsvStrategy();
export const invoiceCsvStrategy = new InvoiceCsvStrategy();
