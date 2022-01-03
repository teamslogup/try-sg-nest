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

  async createPost(body: CreatePostRequestDto, currUserId: AccountEntity) {
    try {
      if (!body.title) {
        throw new HttpException([errorConstant.postTitleError], 404);
      }
      const images = this.savePostImage(body.images);
      const { id, name } = currUserId;
      const post = this.postRepository.create({
        ...body,
        images,
        author: name,
        accountId: id,
      });
      const createPost = await this.postRepository.save(post);
      const { accountId, ...payload } = createPost;
      payload.images = JSON.parse(payload.images);
      return payload;
    } catch (err) {
      throw new NotFoundException();
    }
  }

  async requestPosts(query: RequestPostsRequestDto) {
    try {
      const findPosts = await this.postRepository.find({
        order: { id: "DESC" },
        skip: query.page * query.limit,
        take: query.limit,
        where: query.keyword && { title: Like(`%${query.keyword}%`) },
      });
      for (let post of findPosts) {
        post.images = JSON.parse(post.images);
      }
      return findPosts;
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
    const post = await this.requestPostOne(id);
    if (post.accountId !== currUserId) {
      const payload = errorConstant.postUserError;
      throw new HttpException([payload], 403);
    }
    if (body.title === null || body.title === "") {
      const payload = errorConstant.postTitleError;
      throw new HttpException([payload], 400);
    }

    const images = this.savePostImage(body.images);
    const updatePost = { ...post, ...body, images };
    const savePost = await this.postRepository.save(updatePost);
    savePost.images = JSON.parse(savePost.images);
    return savePost;
  }

  savePostImage(images: string): string {
    let changeImages = "[";
    if (images) {
      for (let i = 0; i < images.length; i++) {
        changeImages += JSON.stringify(images[i]);
        if (i < images.length - 1) {
          changeImages += ",";
        }
      }
    }
    changeImages += "]";
    return changeImages;
  }
}
