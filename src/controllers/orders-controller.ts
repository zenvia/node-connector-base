import { IOrderDTO, IZenApiConfig } from '../models/zen-api';
import { AbstractCsvStrategy } from '../strategies/abstract-csv-strategy';
import { BaseBatchController } from './base-bacth-controller';

export class OrdersController extends BaseBatchController<IOrderDTO> {
  constructor(zenApiConfig: IZenApiConfig, csvStrategy: AbstractCsvStrategy<IOrderDTO>) {
    super(
      {
        zenApiConfig,
        csvStrategy,
        resourceName: 'order',
      }
    );
  }
}
