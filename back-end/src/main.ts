import { AppModule } from '@/app.module';
import { EnvironmentVaribales } from '@/config/configuration';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	const configService = app.get(ConfigService<EnvironmentVaribales>);

	app.setGlobalPrefix('api');
	app.useGlobalPipes(new ValidationPipe());
	app.use(cookieParser());
	app.enableCors({
		origin: [configService.get('originUrl')],
		credentials: true,
		exposedHeaders: 'set-cookie',
	});

	// Turn off `X-Powered-By` response header.
	// app.disable('x-powered-by'); requires ts-ignore
	app.getHttpAdapter().getInstance().disable('x-powered-by');

	await app.listen(configService.get('port'));
}
bootstrap();
