import { AutoMap } from '@automapper/classes';
import { IContactInfo, ILead } from '@domain/primitives';
import { BaseModel } from './base.model';
import { LeadSourceCd, LeadStatusCd } from '../enums';

export class Lead extends BaseModel implements ILead {
  @AutoMap()
  firstName: string;

  @AutoMap()
  secondName?: string;

  @AutoMap()
  lastName: string;

  @AutoMap()
  secondLastName?: string;

  @AutoMap()
  fullName: string;

  @AutoMap()
  representsOrganization: boolean;

  @AutoMap()
  organizationName?: string;

  @AutoMap()
  jobTitle?: string;

  @AutoMap()
  contactData: IContactInfo[];

  @AutoMap()
  statusCd: LeadStatusCd;

  @AutoMap()
  sourceCd: LeadSourceCd;

  @AutoMap()
  assignedTo?: string;

  @AutoMap()
  assignedAt?: Date;

  @AutoMap()
  companyId: string;
}
