import { ContactTypeCd } from '@domain/enums';
import { ISubModel } from './base-sub-model.interface';

export interface IContactInfo extends ISubModel {
  typeCd: ContactTypeCd;
  value: string;
  isPrimary: boolean;
}
