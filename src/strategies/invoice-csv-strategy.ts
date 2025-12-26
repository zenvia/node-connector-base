import { IInvoiceDTO } from "../models/zen-api";
import { AbstractCsvStrategy } from "./abstract-csv-strategy";

export class InvoiceCsvStrategy extends AbstractCsvStrategy<IInvoiceDTO> {
  protected getHeaders(): string[] {
    return [
      'externalPlatform', 'externalId', 'customerExternalId', 'issueTimestamp',
      'invoiceKey', 'invoiceNumber', 'invoiceSerie', 'orderNumber', 'orderExternalId',
      'legalCode', 'legalName', 'primaryPhone', 'email', 'totalAmount',
      'productExternalId', 'sku', 'ean', 'name', 'quantity', 'measurementUnit',
      'priceUnit', 'totalValue', 'fiscalOperationCode', 'ncm', 'currency'
    ];
  }

  protected mapRow(data: IInvoiceDTO): any[] {
    const items = data.items || [];
    return [
      data.externalPlatform,
      data.externalId,
      data.customerExternalId,
      data.issueTimestamp,
      data.invoiceKey,
      data.invoiceNumber,
      data.invoiceSerie,
      data.orderNumber,
      data.orderExternalId,
      data.legalCode,
      data.legalName,
      data.primaryPhone,
      data.email,
      data.totalAmount,
      this.joinItemFields(items, 'productExternalId'),
      this.joinItemFields(items, 'sku'),
      this.joinItemFields(items, 'ean'),
      this.joinItemFields(items, 'name'),
      this.joinItemFields(items, 'quantity'),
      this.joinItemFields(items, 'measurementUnit'),
      this.joinItemFields(items, 'priceUnit'),
      this.joinItemFields(items, 'totalValue'),
      this.joinItemFields(items, 'fiscalOperationCode'),
      this.joinItemFields(items, 'ncm'),
      this.joinItemFields(items, 'currency')
    ];
  }
}
