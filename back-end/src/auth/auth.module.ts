import { AuthController } from '@/auth/auth.controller';
import { AuthService } from '@/auth/auth.service';
import { JwtStrategy } from '@/auth/strategies/jwt.strategy';
import { EnvironmentVaribales } from '@/config/configuration';
import { TokenModule } from '@/token/token.module';
import { UserModule } from '@/user/user.module';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

@Module({
	imports: [
		UserModule,
		PassportModule,
		TokenModule,
		JwtModule.registerAsync({
			imports: [ConfigModule],
			global: true,
			useFactory: async (
				configService: ConfigService<EnvironmentVaribales>,
			) => ({
				secret: configService.get('jwtSecret'),
			}),
			inject: [ConfigService],
		}),
	],
	controllers: [AuthController],
	providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
