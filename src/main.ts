import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  /**
   * Validation 파이프 라인 등록
   */
  app.useGlobalPipes(
    new ValidationPipe({
      // 필요없는 파라미터 전송시 자동으로 오류 리턴
      whitelist: true,
      // Path param 등 타입 형변환 자동적용
      transform: true,
    }),
  );

  /**
   * 스웨거 설정
   */
  const config = new DocumentBuilder()
    .setTitle('BOARD APIS')
    .setDescription('NestJS + Swagger API 정의서 샘플')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('apis', app, document);

  await app.listen(3000);
}

bootstrap();
