import { LeadSourceCd, LeadStatusCd } from '@domain/enums';
import { IModel } from './base-model.interface';
import { IContactInfo } from './contact-info.interface';

export interface ILead extends IModel {
  firstName: string;
  secondName?: string;
  lastName: string;
  secondLastName?: string;
  fullName: string;
  representsOrganization: boolean;
  organizationName?: string;
  jobTitle?: string;
  contactData: IContactInfo[];
  statusCd: LeadStatusCd;
  sourceCd: LeadSourceCd;
  assignedTo?: string;
  assignedAt?: Date;
  companyId: string;
}
