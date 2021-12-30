import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';
import express from 'express';
import { join } from 'path';

declare const module: any;

async function bootstrap() {
	const app: NestExpressApplication = await NestFactory.create<NestExpressApplication>(AppModule);
	app.use('/public', express.static(join(__dirname, '../public')));

	app.useGlobalPipes(
		new ValidationPipe({
			whitelist: true,
			transform: true,
		}),
	);

	const config = new DocumentBuilder()
		.setTitle('APIS')
		.setDescription('NestJS and Swagger API docs')
		.setVersion('1.0')
		.build();
	const document = SwaggerModule.createDocument(app, config);
	SwaggerModule.setup('apis', app, document);

	if (module.hot) {
		module.hot.accept();
		module.hot.dispose(() => app.close());
	}

	await app.listen(3000);
}

bootstrap();
