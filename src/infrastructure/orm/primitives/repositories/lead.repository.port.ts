import { ILead, ISearchMetadata, ILeadFilter } from '@domain/primitives';
import { IRepository } from './base.repository.port';
import { LeadSortingFields } from '@domain/enums';

export interface ILeadRepository extends IRepository<ILead> {
  search(
    filter: ILeadFilter,
    options?: ISearchMetadata<LeadSortingFields>,
  ): Promise<[ILead[], ISearchMetadata]>;
}
