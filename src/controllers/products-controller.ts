import { ProductDTO } from '../models/zen-api';
import { AbstractCsvStrategy } from '../strategies/abstract-csv-strategy';
import { BaseBatchController } from './base-bacth-controller';

export class ProductsController extends BaseBatchController<ProductDTO> {
  constructor(zenApiConfig: any, csvStrategy: AbstractCsvStrategy<ProductDTO>) {
    super(
      {
        zenApiConfig,
        csvStrategy,
        resourceName: 'product',
      }
    );
  }
}
