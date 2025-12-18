import { OrderDTO } from '../models/zen-api';
import { OrderCsvStrategy } from '../strategies/order-csv-strategy';
import { BaseBatchController } from './base-bacth-controller';

export class OrdersController extends BaseBatchController<OrderDTO> {
  constructor(zenApiConfig: any) {
    super(
      {
        zenApiConfig,
        csvStrategy: new OrderCsvStrategy(),
        resourceName: 'order',
      }
    );
  }
}
