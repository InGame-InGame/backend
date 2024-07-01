import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeORMConfig } from './common/config/typeorm.config';
import { UsersModule } from './apis/users/users.module';
import { RankingModule } from './apis/ranking/ranking.module';
import { QuestsModule } from './apis/quests/quests.module';
import { AuthModule } from './apis/auth/auth.module';
import { APP_FILTER } from '@nestjs/core';
import { AllExceptionFilter } from './common/filters/all-exception.filter';
import { SchedulerModule } from './common/scheduler/scheduler.module';
import { PointModule } from './apis/point/point.module';
import { CommonModule } from './common/common.module';
import { HealthcheckModule } from './common/healthcheck/healthcheck.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      envFilePath: process.env.NODE_ENV === 'production' ? '.production.env' : '.development.env',
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => typeORMConfig(configService),
    }),
    SchedulerModule,
    UsersModule,
    AuthModule,
    QuestsModule,
    RankingModule,
    PointModule,
    CommonModule,
    HealthcheckModule,
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: AllExceptionFilter,
    },
  ],
})
export class AppModule {}
