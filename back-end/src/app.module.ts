import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { TaskModule } from './task/task.module';
import { TokenModule } from './token/token.module';
import { UserModule } from './user/user.module';
import { TimeBlockModule } from './time-block/time-block.module';

@Module({
	imports: [
		ConfigModule.forRoot({ isGlobal: true }),
		AuthModule,
		UserModule,
		TokenModule,
		TaskModule,
		TimeBlockModule,
	],
})
export class AppModule {}
