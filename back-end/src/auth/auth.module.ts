import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { EnvironmentVaribales } from 'src/config/configuration';
import { TokenModule } from 'src/token/token.module';
import { UserModule } from 'src/user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
	imports: [
		UserModule,
		PassportModule,
		TokenModule,
		JwtModule.registerAsync({
			imports: [ConfigModule],
			global: true,
			useFactory: async (configService: ConfigService<EnvironmentVaribales>) => ({
				secret: configService.get('jwtSecret'),
			}),
			inject: [ConfigService],
		}),
	],
	controllers: [AuthController],
	providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
