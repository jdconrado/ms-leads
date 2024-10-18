import { ORMModule } from '@infra/orm/orm.module';
import { LeadService } from './lead.service';
import { Module } from '@nestjs/common';

@Module({
  imports: [ORMModule],
  providers: [LeadService],
  exports: [LeadService],
})
export class ServiceModule {}
