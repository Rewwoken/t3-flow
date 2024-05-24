import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { TaskModule } from './task/task.module';
import { TokenModule } from './token/token.module';
import { UserModule } from './user/user.module';
import { TimeBlockModule } from './time-block/time-block.module';
import { TimerModule } from './timer/timer.module';

@Module({
	imports: [
		ConfigModule.forRoot({ isGlobal: true }),
		AuthModule,
		UserModule,
		TokenModule,
		TaskModule,
		TimeBlockModule,
		TimerModule,
	],
})
export class AppModule {}
