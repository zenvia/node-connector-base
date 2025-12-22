import { IContactDTO } from "../models/zen-api";
import { AbstractCsvStrategy } from "./abstract-csv-strategy";

export class ContactCsvStrategy extends AbstractCsvStrategy<IContactDTO> {
  protected getHeaders(): string[] {
    return [
      'externalPlatform', 'externalId', 'firstName', 'lastName', 'birthdate',
      'email', 'mobile', 'landline', 'country', 'zipcode', 'state', 'city',
      'address', 'streetNumber', 'neighborhood'
    ];
  }

  protected mapRow(data: IContactDTO): any[] {
    return [
      data.externalPlatform,
      data.externalId,
      data.firstName,
      data.lastName,
      data.birthdate,
      data.email,
      data.mobile,
      data.landline,
      data.country,
      data.zipcode,
      data.state,
      data.city,
      data.address,
      data.streetNumber,
      data.neighborhood
    ];
  }
}
