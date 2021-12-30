import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { AccountEntity } from 'src/entities/AccountEntity';
import { PostEntity } from 'src/entities/PostEntity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ImageService } from 'src/image/image.service';

@Module({
	imports: [TypeOrmModule.forFeature([AccountEntity, PostEntity])],
	providers: [PostService, ImageService],
	controllers: [PostController],
})
export class PostModule {}
