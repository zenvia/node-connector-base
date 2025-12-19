import { IProductDTO } from "../models/zen-api";
import { AbstractCsvStrategy } from "./abstract-csv-strategy";

export class ProductCsvStrategy extends AbstractCsvStrategy<IProductDTO> {
  protected getHeaders(): string[] {
    return [
      'externalPlatform', 'externalId', 'name', 'sku', 'ean', 'brand',
      'description', 'measurementUnit', 'priceUnit', 'currency', 'ncm'
    ];
  }

  protected mapRow(data: IProductDTO): any[] {
    return [
      data.externalPlatform,
      data.externalId,
      data.name,
      data.sku,
      data.ean,
      data.brand,
      data.description,
      data.measurementUnit,
      data.priceUnit,
      data.currency,
      data.ncm
    ];
  }
}
