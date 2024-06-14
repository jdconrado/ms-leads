import { ILeadFilter } from '@domain/primitives';
import { AutoMap } from '@automapper/classes';
import { LeadStatusCd } from '@domain/enums';

export class RoomFilter implements ILeadFilter {
  @AutoMap()
  name?: string;
  @AutoMap()
  userId?: string;
  @AutoMap()
  status?: LeadStatusCd[];
}
