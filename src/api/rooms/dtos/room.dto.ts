import { EntityDto } from './entity.dto';
import { AutoMap } from '@automapper/classes';
import { RoomParticipantDto } from './room-participant.dto';
import { Type } from 'class-transformer';
import { LeadStatusCd } from '@domain/enums';

export class RoomDto extends EntityDto {
  @AutoMap()
  name: string;

  @AutoMap()
  routerId?: string;

  @AutoMap()
  status: LeadStatusCd;

  @AutoMap(() => [RoomParticipantDto])
  @Type(() => RoomParticipantDto)
  participants: RoomParticipantDto[];
}
