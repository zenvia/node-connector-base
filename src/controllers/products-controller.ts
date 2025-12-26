import { IProductDTO, IZenApiConfig } from '../models/zen-api';
import { AbstractCsvStrategy } from '../strategies/abstract-csv-strategy';
import { BaseBatchController } from './base-bacth-controller';

export class ProductsController extends BaseBatchController<IProductDTO> {
  constructor(zenApiConfig: IZenApiConfig, csvStrategy: AbstractCsvStrategy<IProductDTO>) {
    super(
      {
        zenApiConfig,
        csvStrategy,
        resourceName: 'product',
      }
    );
  }
}
