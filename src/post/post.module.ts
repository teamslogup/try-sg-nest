import { forwardRef, Module } from "@nestjs/common";
import { PostService } from "./post.service";
import { ImageController, PostController } from "./post.controller";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PostEntity } from "../entities/Post.entity";
import { AccountModule } from "../account/account.module";

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forFeature([PostEntity]),
    forwardRef(() => AccountModule),
  ],
  controllers: [PostController, ImageController],
  providers: [PostService],
})
export class PostModule {}
