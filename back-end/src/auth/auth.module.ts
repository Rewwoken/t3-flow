import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from 'src/users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TokenModule } from 'src/token/token.module';

@Module({
	imports: [
		UsersModule,
		PassportModule,
		TokenModule,
		JwtModule.register({
			global: true,
			secret: process.env.JWT_SECRET,
		}),
	],
	controllers: [AuthController],
	providers: [AuthService],
})
export class AuthModule {}
