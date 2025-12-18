import { ContactDTO } from '../models/zen-api';
import { ContactCsvStrategy } from '../strategies/contact-csv-strategy';
import { BaseBatchController } from './base-bacth-controller';

export class ContactsController extends BaseBatchController<ContactDTO> {
  constructor(zenApiConfig: any) {
    super(
      {
        zenApiConfig,
        csvStrategy: new ContactCsvStrategy(),
        resourceName: 'contact',
      }
    );
  }
}
