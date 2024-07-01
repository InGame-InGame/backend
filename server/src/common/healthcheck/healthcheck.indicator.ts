import { Injectable } from '@nestjs/common';
import { HealthIndicator } from '@nestjs/terminus';

@Injectable()
export class HealthCheckIndicator extends HealthIndicator {}
