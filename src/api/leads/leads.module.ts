import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { ServiceModule } from '@services/service.module';
import { LeadController } from './lead.controller';
import { Handlers } from '@api/leads/cqrs/handlers';
import { LeadProfile } from '@api/leads/profiles/lead.profile';

@Module({
  imports: [CqrsModule, ServiceModule],
  controllers: [LeadController],
  providers: [LeadProfile, ...Handlers],
})
export class LeadModule {}
