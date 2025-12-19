import { OrderDTO } from '../models/zen-api';
import { AbstractCsvStrategy } from '../strategies/abstract-csv-strategy';
import { BaseBatchController } from './base-bacth-controller';

export class OrdersController extends BaseBatchController<OrderDTO> {
  constructor(zenApiConfig: any, csvStrategy: AbstractCsvStrategy<OrderDTO>) {
    super(
      {
        zenApiConfig,
        csvStrategy,
        resourceName: 'order',
      }
    );
  }
}
