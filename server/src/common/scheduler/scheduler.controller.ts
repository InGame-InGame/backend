import { Cron, CronExpression } from '@nestjs/schedule';
import { SchedulerService } from './scheduler.service';
import { Controller } from '@nestjs/common';
import { PointService } from '../../apis/point/point.service';

@Controller('scheduler')
export class SchedulerController {
  constructor(
    private readonly schedulerService: SchedulerService,
    private readonly pointService: PointService
  ) {}

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async updateQuestStatus() {
    await this.schedulerService.updateQuestStatus(this.pointService);
  }
}
