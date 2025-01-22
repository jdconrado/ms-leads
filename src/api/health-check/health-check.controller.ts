import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('health')
@Controller({ path: 'health-check' })
export class HealthCheckController {
  @Get()
  healthCheck() {
    return 'OK';
  }
}
