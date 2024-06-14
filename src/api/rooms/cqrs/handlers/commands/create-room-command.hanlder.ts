import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateRoomCommand } from '../../commands';
import { Room } from '@domain/models';
import { RoomService } from '@services/room.service';
import { Logger } from '@nestjs/common';
import { LeadStatusCd } from '@domain/enums';

@CommandHandler(CreateRoomCommand)
export class CreateRoomCommandHandler
  implements ICommandHandler<CreateRoomCommand>
{
  private readonly logger = new Logger(CreateRoomCommandHandler.name);
  constructor(private readonly roomService: RoomService) {}
  async execute(command: CreateRoomCommand): Promise<Room> {
    this.logger.debug('execute command');
    command.room.status = LeadStatusCd.ACTIVE;
    const room = await this.roomService.create(command.room);
    this.logger.debug('room created: {room}', { room });

    return room;
  }
}
