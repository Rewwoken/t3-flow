import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TokenService } from './token/token.service';
import { TokenModule } from './token/token.module';

@Module({
	imports: [ConfigModule.forRoot({ isGlobal: true }), AuthModule, UsersModule, TokenModule],
	providers: [TokenService],
})
export class AppModule {}
