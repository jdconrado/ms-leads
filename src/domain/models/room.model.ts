import { AutoMap } from '@automapper/classes';
import { IRoom } from '@domain/primitives';
import { BaseModel } from './base.model';
import { LeadStatusCd } from '../enums';

export class Room extends BaseModel implements IRoom {
  @AutoMap()
  name: string;
  @AutoMap()
  status: LeadStatusCd;
  @AutoMap()
  routerId?: string;
  // public constructor(partial: Required<Room>) {
  //   super();
  //   const value = RoomSchema.parse(partial);
  //   Object.assign(this, value);
  //   this.participants = [];
  //   value.participants?.forEach((participant) => {
  //     this.participants.push(new RoomParticipant(participant));
  //   });
  // }
}
