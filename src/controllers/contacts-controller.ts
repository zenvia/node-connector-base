import { ContactDTO } from '../models/zen-api';
import { AbstractCsvStrategy } from '../strategies/abstract-csv-strategy';
import { BaseBatchController } from './base-bacth-controller';

export class ContactsController extends BaseBatchController<ContactDTO> {
  constructor(zenApiConfig: any, csvStrategy: AbstractCsvStrategy<ContactDTO>) {
    super(
      {
        zenApiConfig,
        csvStrategy,
        resourceName: 'contact',
      }
    );
  }
}
