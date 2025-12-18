import { ProductDTO } from '../models/zen-api';
import { ProductCsvStrategy } from '../strategies/product-csv-strategy';
import { BaseBatchController } from './base-bacth-controller';

export class ProductsController extends BaseBatchController<ProductDTO> {
  constructor(zenApiConfig: any) {
    super(
      {
        zenApiConfig,
        csvStrategy: new ProductCsvStrategy(),
        resourceName: 'product',
      }
    );
  }
}
