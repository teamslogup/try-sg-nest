import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AccountEntity } from 'src/entities/AccountEntity';
import { PostEntity } from 'src/entities/PostEntity';
import { Like, Repository } from 'typeorm';
import { CreatePostDto } from './dto/CreatePostDto';
import { GetPostsRequestDto } from './dto/GetPostDto';
import { UpdatePostDto } from './dto/UpdatePostDto';

@Injectable()
export class PostService {
	constructor(
		@InjectRepository(PostEntity) private postRepository: Repository<PostEntity>,
		@InjectRepository(AccountEntity) private accountRepository: Repository<AccountEntity>,
	) {}

	async createPost(data: CreatePostDto, accountId: string, id: number) {
		const { title, contents, images } = data;
		if (title.length === 0) {
			return {
				code: 400,
				msg: '제목을 입력해주세요',
			};
		}
		const ResponseCreatePost = await this.postRepository.save({
			title: title,
			contents: contents,
			images: images,
			accountId: id,
		});
		const foundUserByAccountId = await this.accountRepository.findOne({ where: { accountId: accountId } });

		return {
			code: 201,
			row: { ...ResponseCreatePost, author: foundUserByAccountId.name },
		};
	}

	async getPost(postId: number) {
		const ResponseGetPost = await this.postRepository.findOne({ where: { id: postId } });
		if (!ResponseGetPost) {
			return {
				code: 400,
				msg: '게시판을 찾을 수 없습니다.',
			};
		}

		return {
			code: 200,
			row: ResponseGetPost,
		};
	}

	async getPosts(data: GetPostsRequestDto) {
		let { page, limit, keyword } = data;

		if (!keyword) {
			keyword = '';
		}
		const paginationItem = await this.postRepository.find({
			skip: page * limit,
			take: limit,
			where: { title: Like(`%${keyword}%`) },
			order: {
				createdAt: 'DESC',
			},
		});

		return {
			rows: [...paginationItem],
		};
	}

	async updatePost(data: UpdatePostDto, postId: number) {
		const { title, contents, images } = data;

		if (title.length === 0) {
			return {
				code: 400,
				msg: '제목을 입력해주세요',
				value: {
					title: null,
				},
			};
		}

		const foundPostByAccountId = await this.postRepository.findOne({ where: { id: postId } });
		foundPostByAccountId.title = title;
		foundPostByAccountId.contents = contents;
		foundPostByAccountId.images = images;

		const ResponseUpdatePost = await this.postRepository.save(foundPostByAccountId);

		return {
			ResponseUpdatePost,
		};
	}

	async deletePost(postId: number) {
		const foundPostById = await this.postRepository.findOne({
			where: { id: postId },
		});

		if (!foundPostById) {
			return {
				code: 400,
				msg: '존재하지 않는 post입니다.',
			};
		}

		await this.postRepository.delete({ id: postId });
		return {
			code: 200,
			value: foundPostById.id,
		};
	}
}
