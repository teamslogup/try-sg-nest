import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountModule } from './modules/account/account.module';
import { PostsModule } from './modules/posts/posts.module';
import { AccountController } from './modules/account/account.controller';
import { AccountService } from './modules/account/account.service';
import { PostsService } from './modules/posts/posts.service';
import { PostsController } from './modules/posts/posts.controller';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'src/db/db.sqlite',
      // 아래 2가지의 설정은 개발환경에서만 사용
      synchronize: true,
      autoLoadEntities: true,
    }),
    AccountModule,
    PostsModule,
  ],
  controllers: [AccountController, PostsController],
  providers: [AccountService, PostsService],
})
export class AppModule {}
