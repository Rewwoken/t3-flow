import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { UserModule } from 'src/user/user.module';
import { TimerController } from './timer.controller';
import { TimerService } from './timer.service';

@Module({
	imports: [UserModule],
	controllers: [TimerController],
	providers: [TimerService, PrismaService],
})
export class TimerModule {}
