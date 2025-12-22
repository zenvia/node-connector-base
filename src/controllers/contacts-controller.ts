import { IContactDTO, IZenApiConfig } from '../models/zen-api';
import { AbstractCsvStrategy } from '../strategies/abstract-csv-strategy';
import { BaseBatchController } from './base-bacth-controller';

export class ContactsController extends BaseBatchController<IContactDTO> {
  constructor(zenApiConfig: IZenApiConfig, csvStrategy: AbstractCsvStrategy<IContactDTO>) {
    super(
      {
        zenApiConfig,
        csvStrategy,
        resourceName: 'contact',
      }
    );
  }
}
