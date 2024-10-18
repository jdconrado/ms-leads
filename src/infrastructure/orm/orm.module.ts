import { Module } from '@nestjs/common';
import { LeadEntityProfile } from '@infra/orm/profiles/lead-entity.profile';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LeadEntity } from './entities';
import { LeadRepository } from './repositories';

@Module({
  imports: [TypeOrmModule.forFeature([LeadEntity])],
  providers: [LeadEntityProfile, LeadRepository],
  exports: [LeadRepository],
})
export class ORMModule {}
