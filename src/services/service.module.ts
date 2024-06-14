import { RepositoryModule } from '@infra/orm/repository.module';
import { RoomService } from './room.service';
import { Module } from '@nestjs/common';

@Module({
  imports: [RepositoryModule],
  providers: [RoomService],
  exports: [RoomService],
})
export class ServiceModule {}
