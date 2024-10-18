import { Module } from '@nestjs/common';
import { AutomapperModule } from '@automapper/nestjs';
import { classes } from '@automapper/classes';
import { LeadModule } from '@api/leads/leads.module';
import { ConfigModule } from '@nestjs/config';
import { InfrastructureModule } from '@infra/infastructure.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { HealthCheckModule } from '@api/health-check/health-check.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
      cache: true,
    }),
    EventEmitterModule.forRoot(),
    AutomapperModule.forRoot({
      strategyInitializer: classes(),
    }),
    InfrastructureModule,
    HealthCheckModule,
    LeadModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
