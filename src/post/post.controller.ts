import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import { PostService } from "./post.service";
import { JwtAuthGuard } from "../common/guards/auth.guard";
import { CurrentUser } from "../common/decorators/currentUser.decorator";
import { AccountEntity } from "../entities/Account.entity";
import { CreatePostRequestDto } from "./dto/createPost.request.dto";
import { RequestPostsRequestDto } from "./dto/requestPosts.request.dto";
import { UpdatePostRequestDto } from "./dto/updatePost.request.dto";
import { FileInterceptor } from "@nestjs/platform-express";
import { multerOptions } from "../multerOptions";
import { PostEntity } from "../entities/Post.entity";

@Controller("posts")
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get()
  requestPosts(
    @Query() query: RequestPostsRequestDto
  ): Promise<Omit<PostEntity[], "accountId">> {
    return this.postService.requestPosts(query);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  createPost(
    @Body() body: CreatePostRequestDto,
    @CurrentUser() account: AccountEntity
  ): Promise<Omit<PostEntity, "accountId">> {
    return this.postService.createPost(body, account);
  }

  @Get(":id")
  requestPostOne(
    @Param("id") id: number
  ): Promise<Omit<PostEntity, "accountId">> {
    return this.postService.requestPostOne(id);
  }

  @Put(":id")
  @UseGuards(JwtAuthGuard)
  updatePost(
    @Param("id") id: number,
    @Body() body: UpdatePostRequestDto,
    @CurrentUser() user: AccountEntity
  ): Promise<Omit<PostEntity, "accountId">> {
    return this.postService.updatePost(id, body, user.id);
  }

  @Delete(":id")
  @UseGuards(JwtAuthGuard)
  @HttpCode(204)
  deletePost(
    @Param("id") id: number,
    @CurrentUser() user: AccountEntity
  ): Promise<void> {
    return this.postService.deletePost(id, user.id);
  }
}

@Controller("uploader")
export class ImageController {
  constructor(private postService: PostService) {}

  @UseInterceptors(FileInterceptor("image", multerOptions))
  @Post("images")
  uploadImage(@UploadedFile() file: Express.Multer.File): Object {
    return this.postService.uploadImage(file);
  }
}
