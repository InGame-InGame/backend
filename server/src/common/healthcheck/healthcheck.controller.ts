import { Controller } from '@nestjs/common';
import { HealthCheckService } from '@nestjs/terminus';

@Controller('healthcheck')
export class HealthcheckController {
  constructor(private healthCheckService: HealthCheckService) {}
}
