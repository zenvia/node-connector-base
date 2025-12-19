import { InvoiceDTO } from '../models/zen-api';
import { AbstractCsvStrategy } from '../strategies/abstract-csv-strategy';
import { BaseBatchController } from './base-bacth-controller';

export class InvoiceController extends BaseBatchController<InvoiceDTO> {
  constructor(zenApiConfig: any, csvStrategy: AbstractCsvStrategy<InvoiceDTO>) {
    super(
      {
        zenApiConfig,
        csvStrategy,
        resourceName: 'invoice',
      }
    );
  }
}
