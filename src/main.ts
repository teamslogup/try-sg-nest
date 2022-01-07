import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { HttpExceptionFilter } from "./common/interceptors/http.exception.filter";
import { TransformInterceptor } from "./common/interceptors/transform.interceptor";
import express from "express";
import { join } from "path";

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({ exposedHeaders: "x-auth-token" });
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(new TransformInterceptor());

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: false,
      transform: true,
    })
  );

  app.use("/upload", express.static(join(__dirname, "../upload")));

  const config = new DocumentBuilder()
    .setTitle("APIS")
    .setDescription("NestJS and Swagger API docs")
    .setVersion("1.1")
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("apis", app, document);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }

  await app.listen(3000);
}

bootstrap();
