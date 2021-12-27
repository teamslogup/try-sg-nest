import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountController } from './account/account.controller';
import { AccountService } from './account/account.service';
import { ConfigModule } from '@nestjs/config';
import { AccountModule } from './account/account.module';
import { AuthModule } from './auth/auth.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerMiddleware } from './middlewares/logger.middleware';
import config from '../ormconfig';

@Module({
	imports: [ConfigModule.forRoot(), TypeOrmModule.forRoot(config), AccountModule, AuthModule],
	controllers: [AccountController, AppController],
	providers: [AccountService, AppService],
})
export class AppModule implements NestModule {
	configure(consumer: MiddlewareConsumer): any {
		consumer.apply(LoggerMiddleware).forRoutes('*');
	}
}
