import { HttpException, Injectable, NotFoundException } from "@nestjs/common";
import { PostEntity } from "../common/entities/post.entity";
import { Like, Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { errorConstant } from "../common/constants/error.constant";
import { CreatePostRequestDto } from "./dtos/create-post.request.dto";
import { AccountEntity } from "../common/entities/account.entity";
import { RequestPostsRequestDto } from "./dtos/request-posts.request.dto";
import { UpdatePostRequestDto } from "./dtos/update-post.request.dto";
import { createImageURL } from "../multer-options";

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(PostEntity) private postRepository: Repository<PostEntity>
  ) {}

  async createPost(
    body: CreatePostRequestDto,
    currAccount: Pick<AccountEntity, "id" | "name">
  ): Promise<Omit<PostEntity, "accountId">> {
    if (!body.title) {
      throw new HttpException([errorConstant.postTitleError], 404);
    }
    const images = this.savePostImage(body.images);
    const { id, name } = currAccount;
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
  }

  async requestPosts(
    query: RequestPostsRequestDto
  ): Promise<Omit<PostEntity[], "accountId">> {
    try {
      const findPosts = await this.postRepository.find({
        order: { id: "DESC" },
        skip: query.page * query.limit,
        take: query.limit,
        where: query.keyword && { title: Like(`%${query.keyword}%`) },
      });
      for (let post of findPosts) {
        delete post.accountId;
        post.images = JSON.parse(post.images);
      }
      return findPosts;
    } catch (err) {
      throw new NotFoundException(err);
    }
  }

  async requestPostOne(id: number): Promise<Omit<PostEntity, "accountId">> {
    try {
      const { accountId, ...postOne } = await this.postRepository.findOne(id);
      // postOne.images = JSON.parse(postOne.images);
      return postOne;
    } catch (err) {
      throw new NotFoundException();
    }
  }

  async updatePost(
    id: number,
    body: UpdatePostRequestDto,
    currUserId: number
  ): Promise<Omit<PostEntity, "accountId">> {
    const post = await this.postRepository.findOne(id);
    if (post.accountId !== currUserId) {
      throw new HttpException([errorConstant.postUserError], 403);
    }
    if (body.title === null || body.title === "") {
      throw new HttpException([errorConstant.postTitleError], 400);
    }

    const images = this.savePostImage(body.images);
    const updatePost = { ...post, ...body, images };
    const { accountId, ...savePost } = await this.postRepository.save(
      updatePost
    );
    savePost.images = JSON.parse(savePost.images);
    return savePost;
  }

  async deletePost(id: number, currUserId: number): Promise<void> {
    const post = await this.postRepository.findOne(id);
    if (post.accountId !== currUserId) {
      throw new HttpException([errorConstant.postUserError], 403);
    }
    await this.postRepository.delete(id);
    return;
  }

  uploadImage(file: Express.Multer.File): Object {
    const createURLFile = createImageURL(file);

    return { url: createURLFile };
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
