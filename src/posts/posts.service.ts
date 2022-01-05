import { ForbiddenException, HttpException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Posts } from '../entities/Posts';
import { Accounts } from '../entities/Accounts';
import { getRepository, Like, Repository } from 'typeorm';
import { TokenFunction } from '../utils/tokenFunction';

@Injectable()
export class PostsService {
	constructor(
		@InjectRepository(Accounts)
		private accountRepository: Repository<Accounts>,
		@InjectRepository(Posts)
		private postRepository: Repository<Posts>,
		private tokenFunction: TokenFunction,
	) {}

	async post(body, req) {
		const userInfo = this.tokenFunction.isAuthorized(req);

		const { title, contents, images } = body;
		if (!userInfo) {
			throw new NotFoundException('_');
		}

		if (!title) {
			throw new ForbiddenException({ code: 'requiredTitle', message: '제목을 입력해주세요.' });
		}

		const post = await this.postRepository.save({
			//@ts-ignore
			accountId: userInfo.userInfo.id,
			//@ts-ignore
			userId: userInfo.userInfo.userId,
			title: title,
			contents: contents,
			images: images,
			createdAt: new Date(),
			updatedAt: new Date(),
		});

		throw new HttpException(post, 201);
	}

	async getPostById(param) {
		const post = await this.postRepository.findOne({ where: { id: param.postId } });

		if (!post) {
			throw new NotFoundException('_');
		}

		throw new HttpException(post, 200);
	}

	async getPostLists(query) {
		const { page, limit, keyword } = query;
		const totalCount = await this.postRepository.count();
		if (!keyword) {
			const result = await this.postRepository.find({ skip: page * 12, take: limit });
			throw new HttpException([result, totalCount], 200);
		}
		const data = await getRepository(Posts).find({ title: Like(`%${keyword}%`) });
		if (!data) {
			throw new NotFoundException('not found');
		}
		throw new HttpException(data, 200);
	}

	async updatePost(param, body, req) {
		const { postId } = param;
		const { title, contents, images } = body;
		const userInfo = await this.tokenFunction.isAuthorized(req);
		if (!userInfo.userInfo) {
			throw new UnauthorizedException({
				code: 'invalidAuthToken',
				message: '사용자 인증 토큰이 유효하지 않습니다. 다시 로그인해주세요.',
				value: { 'x-auth-token': null },
			});
		}
		const findPost = await this.postRepository.findOne({ where: { id: postId } });
		//@ts-ignore
		if (userInfo.userInfo.id !== findPost.accountId) {
			throw new HttpException({ code: 'invalidUser', message: '타인이 작성한 글은 수정할 수 없습니다.' }, 401);
		}

		if (title === null || title === '') {
			throw new ForbiddenException({
				code: 'requiredTitle',
				message: '제목을 입력해주세요.',
				value: {
					title: title,
				},
			});
		}

		findPost.title = title;
		findPost.contents = contents;
		findPost.images = images;
		await this.postRepository.save(findPost);
		const updatedData = await this.postRepository.findOne({ where: { id: postId } });
		throw new HttpException(updatedData, 200);
	}

	async deletePost(param, req) {
		const userInfo = await this.tokenFunction.isAuthorized(req);
		if (!userInfo) {
			throw new UnauthorizedException({
				code: 'invalidAuthToken',
				message: '사용자 인증 토큰이 유효하지 않습니다. 다시 로그인해주세요.',
				value: { 'x-auth-token': null },
			});
		}
		const findPost = await this.postRepository.findOne({ where: { id: param.postId } });
		//@ts-ignore
		if (userInfo.userInfo.id !== findPost.accountId) {
			throw new HttpException({ code: 'invalidUser', message: '타인이 작성한 글은 삭제할 수 없습니다.' }, 401);
		}

		if (!findPost) {
			throw new NotFoundException('_');
		}
		await this.postRepository.delete(param.postId);
		throw new HttpException('_', 204);
	}
}
