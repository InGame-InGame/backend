import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Quest } from '../../apis/quests/entities/quest.entity';
import { Repository } from 'typeorm';
import { Mode, Status } from '../../apis/quests/enums/quest.enum';
import { PointService } from '../../apis/point/point.service';
import { UpdatePointDto } from '../../apis/point/dto/update-point.dto';
import { SideQuest } from '../../apis/quests/entities/side-quest.entity';

@Injectable()
export class SchedulerService {
  private readonly logger = new Logger(SchedulerService.name);

  constructor(
    @InjectRepository(Quest) private readonly questRepository: Repository<Quest>,
    @InjectRepository(SideQuest) private readonly sideQuestRepository: Repository<SideQuest>
  ) {}

  async updateQuestStatus(pointService: PointService) {
    const moveDate = (date: Date, days: number) => {
      const newDate = new Date(date);
      newDate.setHours(newDate.getHours() + 9); // KST 기준으로 변경, UTC일 경우에는 제거
      newDate.setDate(newDate.getDate() + days);
      return newDate;
    };
    const currentDate = new Date();
    const dueDate = moveDate(currentDate, -1);

    const targetQuests = await this.questRepository.find({
      where: {
        mode: Mode.Main,
        status: Status.onProgress,
        endDate: dueDate.toISOString().split('T')[0],
      },
      relations: ['sideQuests'],
    });
    const targetSubQuests = await this.questRepository.find({
      where: { mode: Mode.Sub, status: Status.onProgress },
    });

    if (targetQuests.length === 0) {
      this.logger.error('[main] There is no quests to update!');
      return;
    } else {
      for (const quest of targetQuests) {
        const completedSideQuestsCount = quest.sideQuests.filter(
          (sideQuest) => sideQuest.status === Status.Completed
        ).length;

        if (completedSideQuestsCount > 0) {
          quest.status = Status.Completed;
          quest.updatedAt = currentDate;
        } else {
          quest.status = Status.Fail;
          quest.updatedAt = currentDate;
        }

        for (const sideQuest of quest.sideQuests) {
          if (sideQuest.status === Status.onProgress) {
            sideQuest.status = Status.Fail;
            sideQuest.updatedAt = currentDate;
          }
        }

        await this.sideQuestRepository.save(quest.sideQuests);
        await this.questRepository.save(quest);

        const updatePointDto = {
          questId: quest.id,
          status: quest.status,
        } satisfies UpdatePointDto;

        await pointService.updatePoint(quest.userId, updatePointDto);
      }
    }

    if (targetSubQuests.length === 0) {
      this.logger.error('[sub] There is no quests to update!');
      return;
    } else {
      const updatedSubQuests = targetSubQuests.map((it) => {
        it.status = Status.Fail;
        it.updatedAt = currentDate;
        return it;
      });

      await this.questRepository.save(updatedSubQuests);

      for (const quest of updatedSubQuests) {
        const updatePointDto = {
          questId: quest.id,
          status: Status.Fail,
        } satisfies UpdatePointDto;

        await pointService.updatePoint(quest.userId, updatePointDto);
      }
    }

    this.logger.log(`[${new Date().toISOString()}] Updating quest status success!`);
  }
}
