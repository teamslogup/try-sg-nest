import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
// import { AuthModule } from './auth/auth.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerMiddleware } from './middlewares/logger.middleware';
import config from '../ormconfig';
import { AccountController } from './account/account.controller';
import { AccountService } from './account/account.service';
import { AccountModule } from './account/account.module';
import { Accounts } from './entities/Accounts';
import { Posts } from './entities/Posts';

@Module({
	imports: [ConfigModule.forRoot(), TypeOrmModule.forRoot(config), TypeOrmModule.forFeature([Accounts, Posts]), AccountModule],
	controllers: [AppController, AccountController],
	providers: [AppService, AccountService],
})
export class AppModule implements NestModule {
	configure(consumer: MiddlewareConsumer): any {
		consumer.apply(LoggerMiddleware).forRoutes('*');
	}
}
