import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountModule } from './account/account.module';
import { PostModule } from './post/post.module';
import { ImageModule } from './image/image.module';
import { AuthModule } from './auth/auth.module';
import ormconfig from 'ormconfig';
import { ConfigModule } from '@nestjs/config';

@Module({
	imports: [
		TypeOrmModule.forRoot(ormconfig),
		ConfigModule.forRoot({
			isGlobal: true,
			envFilePath: '.env',
		}),
		AuthModule,
		AccountModule,
		PostModule,
		ImageModule,
	],
	controllers: [],
	providers: [],
})
export class AppModule {}
