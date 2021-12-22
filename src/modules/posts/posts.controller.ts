import { Controller, Delete, Patch, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('posts')
@Controller('posts')
export class PostsController {
  @Post()
  addPost() {}

  @Patch()
  updatePost() {}

  @Delete()
  deletePost() {}
}
