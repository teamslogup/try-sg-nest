import { Body, Controller, Get, Param, Post, Query, Req, UseInterceptors } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UndefinedToNullInterceptor } from '../common/interceptors/undefinedToNull.interceptor';
import { PostsService } from './posts.service';

@ApiTags('Posts')
@UseInterceptors(UndefinedToNullInterceptor)
@Controller('posts')
export class PostsController {
	constructor(private PostsService: PostsService) {}

	@Post()
	async post(@Body() body, @Req() req) {
		await this.PostsService.post(body, req);
	}

	@Get('/:postId')
	async getPostById(@Param() param) {
		await this.PostsService.getPostById(param);
	}

	@Get()
	async getPostLists(@Query() query) {
		await this.PostsService.getPostLists(query);
	}
}
