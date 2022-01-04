import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerMiddleware } from './middlewares/logger.middleware';
import config from '../ormconfig';
import { AccountController } from './account/account.controller';
import { AccountService } from './account/account.service';
import { AccountModule } from './account/account.module';
import { Accounts } from './entities/Accounts';
import { Posts } from './entities/Posts';
import { SenderController } from './sender/sender.controller';
import { SenderModule } from './sender/sender.module';
import { SenderService } from './sender/sender.service';
import { PostsController } from './posts/posts.controller';
import { PostsService } from './posts/posts.service';
import { PostsModule } from './posts/posts.module';
import { TokenFunction } from './utils/tokenFunction';

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
		}),
		TypeOrmModule.forRoot(config),
		TypeOrmModule.forFeature([Accounts, Posts]),
		AccountModule,
		SenderModule,
		PostsModule,
		TokenFunction,
	],
	controllers: [AppController, AccountController, SenderController, PostsController],
	providers: [AppService, AccountService, SenderService, PostsService, TokenFunction],
})
export class AppModule implements NestModule {
	configure(consumer: MiddlewareConsumer): any {
		consumer.apply(LoggerMiddleware).forRoutes('*');
	}
}
