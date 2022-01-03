import { ForbiddenException, HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Posts } from '../entities/Posts';
import { Accounts } from '../entities/Accounts';
import { Repository } from 'typeorm';
import { TokenFunction } from '../utils/tokenFunction';
import { PageRequest } from './pageRequest';

@Injectable()
export class PostsService {
	constructor(
		@InjectRepository(Accounts)
		private accountRepository: Repository<Accounts>,
		@InjectRepository(Posts)
		private postRepository: Repository<Posts>,
		private tokenFunction: TokenFunction,
		private pageRequest: PageRequest,
	) {}

	async post(body, req) {
		const userInfo = this.tokenFunction.isAuthorized(req);

		const { title, contents, images, accountId, userId } = body;
		if (!userInfo) {
			throw new NotFoundException('_');
		}

		if (!title) {
			throw new ForbiddenException({ code: 'requiredTitle', message: '제목을 입력해주세요.' });
		}

		const post = await this.postRepository.save({
			accountId: accountId,
			userId: userId,
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
		// TODO: getOffset 함수 작성
		const offset = this.pageRequest.getOffset(page);
		// createQueryBuilder().select(??).from(포스트 테이블).limit(limit).offset(offset);
	}
}
