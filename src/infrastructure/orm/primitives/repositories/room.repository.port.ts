import { IRoom, ISearchMetadata, ILeadFilter } from '@domain/primitives';
import { IRepository } from './base.repository.port';

export interface IRoomRepository extends IRepository<IRoom> {
  search(
    filter: ILeadFilter,
    options?: ISearchMetadata,
  ): Promise<[IRoom[], ISearchMetadata]>;
}
