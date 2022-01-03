import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Res,
  UseGuards,
} from "@nestjs/common";
import { PostService } from "./post.service";
import { JwtAuthGuard } from "../common/guards/auth.guard";
import { CurrentUser } from "../common/decorators/currentUser.decorator";
import { AccountEntity } from "../entities/Account.entity";
import { CreatePostRequestDto } from "./dto/createPost.request.dto";
import { RequestPostsRequestDto } from "./dto/requestPosts.request.dto";
import { UpdatePostRequestDto } from "./dto/updatePost.request.dto";

@Controller("posts")
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get()
  requestPosts(@Query() query: RequestPostsRequestDto): any {
    return this.postService.requestPosts(query);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  createPost(
    @Body() body: CreatePostRequestDto,
    @CurrentUser() account: AccountEntity
  ) {
    return this.postService.createPost(body, account);
  }

  @Get(":id")
  requestPostOne(@Param("id") id: number) {
    return this.postService.requestPostOne(id);
  }

  @Put(":id")
  @UseGuards(JwtAuthGuard)
  updatePost(
    @Param("id") id: number,
    @Body() body: UpdatePostRequestDto,
    @CurrentUser() user: AccountEntity
  ) {
    return this.postService.updatePost(id, body, user.id);
  }

  @Delete(":id")
  @UseGuards(JwtAuthGuard)
  deletePost(
    @Param("id") id: number,
    @CurrentUser() user: AccountEntity,
    @Res() res
  ) {
    return this.postService.deletePost(id, user.id, res);
  }
}
