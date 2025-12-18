import { InvoiceDTO } from '../models/zen-api';
import { InvoiceCsvStrategy } from '../strategies/invoice-csv-strategy';
import { BaseBatchController } from './base-bacth-controller';

export class InvoiceController extends BaseBatchController<InvoiceDTO> {
  constructor(zenApiConfig: any) {
    super(
      {
        zenApiConfig,
        csvStrategy: new InvoiceCsvStrategy(),
        resourceName: 'invoice',
      }
    );
  }
}
