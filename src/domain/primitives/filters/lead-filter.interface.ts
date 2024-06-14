import { LeadSourceCd, LeadStatusCd } from '@domain/enums';

export interface ILeadFilter {
  fullName?: string;
  representsOrganization?: string;
  organizationName?: string;
  jobTitle?: string;
  statusCd?: LeadStatusCd[];
  sourceCd?: LeadSourceCd[];
  assignedTo?: string;
  companyId?: string;
  email?: string;
  phone?: string;
}
