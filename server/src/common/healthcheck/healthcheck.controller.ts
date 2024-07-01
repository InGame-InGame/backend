import { Controller, Get } from '@nestjs/common';
import {
  HealthCheck,
  HealthCheckService,
  HttpHealthIndicator,
  MicroserviceHealthIndicator,
  TypeOrmHealthIndicator,
} from '@nestjs/terminus';
import { Transport } from '@nestjs/microservices';
import * as process from 'node:process';

@Controller('health')
export class HealthcheckController {
  constructor(
    private healthCheckService: HealthCheckService,
    private httpHealthIndicator: HttpHealthIndicator,
    private typeORMHealthIndicator: TypeOrmHealthIndicator,
    private microServiceHealthIndicator: MicroserviceHealthIndicator
  ) {}

  @Get()
  @HealthCheck()
  check() {
    return this.healthCheckService.check([
      () => this.typeORMHealthIndicator.pingCheck('database'),
      () =>
        this.microServiceHealthIndicator.pingCheck('redis', {
          transport: Transport.REDIS,
          options: { host: process.env.REDIS_HOST, port: parseInt(process.env.REDIS_PORT) },
        }),
      () =>
        this.httpHealthIndicator.pingCheck(
          'api/users',
          `http://${process.env.HOST}:${process.env.PORT}/users`
        ),
      () =>
        this.httpHealthIndicator.pingCheck(
          'api/quests',
          `http://${process.env.HOST}:${process.env.PORT}/quests`
        ),
      () =>
        this.httpHealthIndicator.pingCheck(
          'api/ranking',
          `http://${process.env.HOST}:${process.env.PORT}/ranking?page=1&limit=10`
        ),
      () =>
        this.httpHealthIndicator.pingCheck(
          'api/point',
          `http://${process.env.HOST}:${process.env.PORT}/point`
        ),
    ]);
  }
}
