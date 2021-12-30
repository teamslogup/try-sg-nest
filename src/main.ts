import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { HttpExceptionFilter } from './httpException.filter';

declare const module: any;

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	const config = new DocumentBuilder()
		.setTitle('try_sg_nest API')
		.setDescription('try_sg_nest API 문서입니다.')
		.setVersion('1,0')
		.addTag('try_sg_nest')
		.build();

	app.useGlobalPipes(
		new ValidationPipe({
			// whitelist: true,
			transform: true,
		}),
	);
	app.useGlobalFilters(new HttpExceptionFilter());

	const document = SwaggerModule.createDocument(app, config);
	SwaggerModule.setup('apis', app, document);

	// if (module.hot) {
	// 	module.hot.accept();
	// 	module.hot.dispose(() => app.close());
	// }

	await app.listen(3000);
	console.log(`listening on port 3000`);
}

bootstrap();
