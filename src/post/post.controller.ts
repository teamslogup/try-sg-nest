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
import { CurrentUser } from "../common/decorators/current-user.decorator";
import { AccountEntity } from "../common/entities/account.entity";
import { CreatePostRequestDto } from "./dtos/createPost.request.dto";
import { RequestPostsRequestDto } from "./dtos/requestPosts.request.dto";
import { UpdatePostRequestDto } from "./dtos/updatePost.request.dto";
import { FileInterceptor } from "@nestjs/platform-express";
import { multerOptions } from "../multer-options";
import { PostEntity } from "../common/entities/post.entity";
import { ApiOperation } from "@nestjs/swagger";

@Controller("posts")
export class PostController {
  constructor(private readonly postService: PostService) {}

  @ApiOperation({ summary: "게시물 목록조회" })
  @Get()
  requestPosts(
    @Query() query: RequestPostsRequestDto
  ): Promise<Omit<PostEntity[], "accountId">> {
    return this.postService.requestPosts(query);
  }

  @ApiOperation({ summary: "게시물 등록" })
  @Post()
  @UseGuards(JwtAuthGuard)
  createPost(
    @Body() body: CreatePostRequestDto,
    @CurrentUser() account: Pick<AccountEntity, "id" | "name">
  ): Promise<Omit<PostEntity, "accountId">> {
    return this.postService.createPost(body, account);
  }

  @ApiOperation({ summary: "게시물 단일조회" })
  @Get(":id")
  requestPostOne(
    @Param("id") id: number
  ): Promise<Omit<PostEntity, "accountId">> {
    return this.postService.requestPostOne(id);
  }

  @ApiOperation({ summary: "게시물 수정" })
  @Put(":id")
  @UseGuards(JwtAuthGuard)
  updatePost(
    @Param("id") id: number,
    @Body() body: UpdatePostRequestDto,
    @CurrentUser() user: AccountEntity
  ): Promise<Omit<PostEntity, "accountId">> {
    return this.postService.updatePost(id, body, user.id);
  }

  @ApiOperation({ summary: "게시물 삭제" })
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

  @ApiOperation({ summary: "이미지 업로드" })
  @UseInterceptors(FileInterceptor("image", multerOptions))
  @Post("images")
  uploadImage(@UploadedFile() file: Express.Multer.File): Object {
    return this.postService.uploadImage(file);
  }
}
