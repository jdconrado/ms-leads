import { ILeadFilter } from '@domain/primitives';
import { AutoMap } from '@automapper/classes';
import { LeadSourceCd, LeadStatusCd } from '@domain/enums';

export class LeadFilter implements ILeadFilter {
  @AutoMap()
  fullName?: string;

  @AutoMap()
  representsOrganization?: string;

  @AutoMap()
  organizationName?: string;

  @AutoMap()
  jobTitle?: string;

  @AutoMap()
  statusCd?: LeadStatusCd[];

  @AutoMap()
  sourceCd?: LeadSourceCd[];

  @AutoMap()
  assignedTo?: string;

  @AutoMap()
  companyId?: string;

  @AutoMap()
  email?: string;

  @AutoMap()
  phone?: string;
}
