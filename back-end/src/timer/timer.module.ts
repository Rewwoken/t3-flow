import { PrismaService } from '@/prisma.service';
import { TimerController } from '@/timer/timer.controller';
import { TimerService } from '@/timer/timer.service';
import { UserModule } from '@/user/user.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [UserModule],
  controllers: [TimerController],
  providers: [TimerService, PrismaService],
})
export class TimerModule {}
