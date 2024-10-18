import { ILead, ISearchMetadata, ILeadFilter } from '@domain/primitives';

export interface ILeadService {
  create(input: ILead): Promise<ILead>;
  replace(id: string, input: ILead): Promise<ILead | null>;
  delete(id: string): Promise<ILead | null>;
  getById(id: string): Promise<ILead | null>;
  search(
    filter: ILeadFilter,
    options?: ISearchMetadata,
  ): Promise<[ILead[], ISearchMetadata]>;
}
