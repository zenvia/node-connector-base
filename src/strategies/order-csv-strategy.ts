import { IOrderDTO } from "../models/zen-api";
import { AbstractCsvStrategy } from "./abstract-csv-strategy";

export class OrderCsvStrategy extends AbstractCsvStrategy<IOrderDTO> {
  protected getHeaders(): string[] {
    return [
      'externalPlatform', 'externalId', 'invoiceExternalId', 'customerExternalId',
      'orderNumber', 'orderTimestamp', 'totalAmount', 'legalCode', 'legalName',
      'primaryPhone', 'email', 'orderStatus',
      'productExternalId', 'sku', 'ean', 'name', 'quantity',
      'measurementUnit', 'priceUnit', 'currency'
    ];
  }

  protected mapRow(data: IOrderDTO): any[] {
    const items = data.items || [];
    return [
      data.externalPlatform,
      data.externalId,
      data.invoiceExternalId,
      data.customerExternalId,
      data.orderNumber,
      data.orderTimestamp,
      data.totalAmount,
      data.legalCode,
      data.legalName,
      data.primaryPhone,
      data.email,
      data.orderStatus,
      this.joinItemFields(items, 'productExternalId'),
      this.joinItemFields(items, 'sku'),
      this.joinItemFields(items, 'ean'),
      this.joinItemFields(items, 'name'),
      this.joinItemFields(items, 'quantity'),
      this.joinItemFields(items, 'measurementUnit'),
      this.joinItemFields(items, 'priceUnit'),
      this.joinItemFields(items, 'currency')
    ];
  }
}
