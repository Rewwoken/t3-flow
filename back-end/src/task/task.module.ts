import { PrismaService } from '@/prisma.service';
import { TaskController } from '@/task/task.controller';
import { TaskService } from '@/task/task.service';
import { Module } from '@nestjs/common';

@Module({
  controllers: [TaskController],
  providers: [TaskService, TaskService, PrismaService],
})
export class TaskModule {}
