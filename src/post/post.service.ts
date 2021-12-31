import { HttpException, Injectable, NotFoundException } from "@nestjs/common";
import { PostEntity } from "../entities/Post.entity";
import { Like, Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { errorConstant } from "../common/constants/error.constant";
import { CreatePostRequestDto } from "./dto/createPost.request.dto";
import { AccountEntity } from "../entities/Account.entity";
import { RequestPostsRequestDto } from "./dto/requestPosts.request.dto";

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(PostEntity) private postRepository: Repository<PostEntity>
  ) {}

  async createPost(body: CreatePostRequestDto, account: AccountEntity) {
    if (!body.title) {
      throw new HttpException([errorConstant.postTitleError], 404);
    }
    const { id, name } = account;
    const post = this.postRepository.create({
      ...body,
      author: name,
      accountId: id,
    });
    const createPost = await this.postRepository.save(post);
    const { accountId, ...payload } = createPost;
    return payload;
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

  requestPostOne(id: number) {}
}
