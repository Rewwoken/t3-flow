import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	app.setGlobalPrefix('api');
	app.useGlobalPipes(new ValidationPipe());
	app.use(cookieParser());
	app.enableCors({
		origin: [process.env.ORIGIN_URL],
		credentials: true,
		exposedHeaders: 'set-cookie',
	});

	// turn off `X-Powered-By` response header
	// app.disable('x-powered-by'); requires ts-ignore
	app.getHttpAdapter().getInstance().disable('x-powered-by');

	await app.listen(process.env.PORT);
}
bootstrap();
