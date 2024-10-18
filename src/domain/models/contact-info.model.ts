import { IContactInfo } from '@domain/primitives';
import { BaseSubModel } from './base-sub.model';
import { ContactTypeCd } from '@domain/enums';
import { AutoMap } from '@automapper/classes';

export class ContactInfo extends BaseSubModel implements IContactInfo {
  @AutoMap()
  typeCd: ContactTypeCd;

  @AutoMap()
  value: string;

  @AutoMap()
  isPrimary: boolean;
}
