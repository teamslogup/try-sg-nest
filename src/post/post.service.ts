import { HttpException, Injectable, NotFoundException } from "@nestjs/common";
import { PostEntity } from "../entities/Post.entity";
import { Like, Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { errorConstant } from "../common/constants/error.constant";
import { CreatePostRequestDto } from "./dto/createPost.request.dto";
import { AccountEntity } from "../entities/Account.entity";
import { RequestPostsRequestDto } from "./dto/requestPosts.request.dto";
import { UpdatePostRequestDto } from "./dto/updatePost.request.dto";

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(PostEntity) private postRepository: Repository<PostEntity>
  ) {}

  async createPost(body: CreatePostRequestDto, account: AccountEntity) {
    try {
      if (!body.title) {
        throw new HttpException([errorConstant.postTitleError], 404);
      }
      body.images = JSON.stringify(body.images);
      const { id, name } = account;
      const post = this.postRepository.create({
        ...body,
        author: name,
        accountId: id,
      });
      const createPost = await this.postRepository.save(post);
      const { accountId, ...payload } = createPost;
      return payload;
    } catch (err) {
      throw new NotFoundException();
    }
  }

  async requestPosts(query: RequestPostsRequestDto) {
    try {
      const posts = await this.postRepository.find({
        order: { id: "DESC" },
        skip: query.page * query.limit,
        take: query.limit,
        where: query.keyword && { title: Like(`%${query.keyword}%`) },
      });
      return posts;
      return;
    } catch (err) {
      throw new NotFoundException();
    }
  }

  async requestPostOne(id: number) {
    try {
      return await this.postRepository.findOne(id);
    } catch (err) {
      throw new NotFoundException();
    }
  }

  async updatePost(id: number, body: UpdatePostRequestDto, currUserId: number) {
    try {
      const post = await this.requestPostOne(id);
      if (post.id !== currUserId) {
        const payload = errorConstant.postUserError;
        throw new HttpException([payload], 403);
      }
      if (!body.title && body.title !== undefined) {
        const payload = errorConstant.postTitleError;
        throw new HttpException([payload], 400);
      }

      const updatePost = { ...post, ...body };
      return await this.postRepository.save(updatePost);
    } catch (err) {
      throw new NotFoundException();
    }
  }
}
