import {
	Body,
	Controller,
	Param,
	ParseIntPipe,
	Post,
	Delete,
	Put,
	UseGuards,
	Req,
	Get,
	HttpStatus,
	Res,
	Query,
} from '@nestjs/common';
import {
	ApiBadRequestResponse,
	ApiCreatedResponse,
	ApiHeader,
	ApiInternalServerErrorResponse,
	ApiOkResponse,
	ApiOperation,
	ApiQuery,
	ApiResponse,
	ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

import { Request, Response } from 'express';

import { ImageService } from 'src/image/image.service';
import { PostService } from './post.service';

import { ErrorResponseDto } from '../common/ErrorResponseDto';
import { UpdatePostDto } from './dto/UpdatePostDto';
import { CreatePostDto } from './dto/CreatePostDto';

import { DeletePostResponseDto } from './dto/DeletePostDto';

import { SERVER_ERROR } from 'src/common/responseMessage';
import { BAD_REQUEST } from '../common/requestMessage';
import { GetPostsRequestDto, GetPostsResponseDto } from './dto/GetPostDto';

export class objectType {
	accountId: string;
	id: number;
}

@ApiInternalServerErrorResponse({
	description: SERVER_ERROR,
})
@ApiBadRequestResponse({ description: BAD_REQUEST, status: 400, type: ErrorResponseDto })
@ApiTags('POSTS')
@Controller('posts')
export class PostController {
	constructor(private postService: PostService, private imageService: ImageService) {}

	@ApiOperation({ summary: '게시판작성하기' })
	@ApiCreatedResponse({
		description: '성공',
		type: CreatePostDto,
	})
	@UseGuards(AuthGuard('jwt'))
	@ApiResponse({ description: BAD_REQUEST, type: ErrorResponseDto, status: 400 })
	@ApiHeader({
		name: 'authorization',
		description: 'header token',
	})
	@Post()
	async createPost(@Body() data: CreatePostDto, @Req() req: Request) {
		const { accountId, id } = req.user as objectType;

		try {
			return await this.postService.createPost(data, accountId, id);
		} catch (error) {
			console.log(error);
		}
	}

	@ApiOperation({ summary: '게시물 단일조회' })
	@ApiOkResponse({
		description: '성공',
		type: GetPostsResponseDto,
	})
	@ApiResponse({ description: BAD_REQUEST, status: 400, type: ErrorResponseDto })
	@Get(':id')
	async getPost(@Param('id', ParseIntPipe) postId: number) {
		try {
			return await this.postService.getPost(postId);
		} catch (error) {
			console.log(error);
		}
	}

	@ApiOperation({ summary: '게시물 목록조회' })
	@ApiOkResponse({
		description: '성공',
		type: GetPostsResponseDto,
	})
	@ApiQuery({
		name: 'page',
		description: 'page',
	})
	@ApiQuery({
		name: 'limit',
		description: 'limit',
	})
	@ApiQuery({
		name: 'keyword',
		required: false,
		description: 'keyword',
	})
	@Get()
	async getPosts(@Query('page') page, @Query('limit') limit, @Query('keyword') keyword) {
		try {
			return await this.postService.getPosts({ page, limit, keyword });
		} catch (error) {
			console.log(error);
		}
	}

	@ApiOperation({ summary: '게시판 수정하기' })
	@ApiOkResponse({
		description: '성공',
		type: CreatePostDto,
	})
	@ApiResponse({ status: 400, type: ErrorResponseDto })
	@UseGuards(AuthGuard('jwt'))
	@ApiHeader({
		name: 'authorization',
		description: 'header token',
	})
	@Put(':id')
	async updatePost(@Body() data: UpdatePostDto, @Param('id', ParseIntPipe) postId: number) {
		try {
			return await this.postService.updatePost(data, postId);
		} catch (error) {
			console.log(error);
		}
	}

	@ApiOperation({ summary: '게시판 수정하기' })
	@ApiOkResponse({
		description: '성공',
		type: DeletePostResponseDto,
	})
	@UseGuards(AuthGuard('jwt'))
	@ApiHeader({
		name: 'authorization',
		description: 'header token',
	})
	@Delete(':id')
	async deletePost(@Param('id', ParseIntPipe) postId: number) {
		try {
			return await this.postService.deletePost(postId);
		} catch (error) {
			console.log(error);
		}
	}
}
