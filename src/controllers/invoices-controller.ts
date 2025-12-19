import { IInvoiceDTO, IZenApiConfig } from '../models/zen-api';
import { AbstractCsvStrategy } from '../strategies/abstract-csv-strategy';
import { BaseBatchController } from './base-bacth-controller';

export class InvoiceController extends BaseBatchController<IInvoiceDTO> {
  constructor(zenApiConfig: IZenApiConfig, csvStrategy: AbstractCsvStrategy<IInvoiceDTO>) {
    super(
      {
        zenApiConfig,
        csvStrategy,
        resourceName: 'invoice',
      }
    );
  }
}
