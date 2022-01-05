import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { PostEntity } from "../entities/Post.entity";
import { PostService } from "./post.service";
import { HttpException, NotFoundException } from "@nestjs/common";
import { errorConstant } from "../common/constants/error.constant";

class MockPostRepository {
  #data = [
    {
      id: 15,
      createdAt: "2022-01-04T08:50:17.092Z",
      updatedAt: "2022-01-04T08:50:17.092Z",
      title: "test123",
      contents:
        "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...",
      images: [".../img1.jpg", ".../img2.png"],
      author: "볼리",
      accountId: 1,
    },
    {
      id: 14,
      createdAt: "2022-01-03T05:31:05.473Z",
      updatedAt: "2022-01-03T05:31:05.473Z",
      title: "test123",
      contents:
        "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...",
      images: [".../img1.jpg", ".../img2.png"],
      author: "볼리",
      accountId: 1,
    },
    {
      id: 8,
      createdAt: "2022-01-03T01:44:40.891Z",
      updatedAt: "2022-01-03T01:50:04.000Z",
      title: "test12",
      contents:
        "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...",
      images: [],
      author: "볼리",
      accountId: 1,
    },
    {
      id: 7,
      createdAt: "2022-01-03T01:44:08.051Z",
      updatedAt: "2022-01-03T01:44:08.051Z",
      title: "test123",
      contents:
        "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...",
      images: [],
      author: "볼리",
      accountId: 3,
    },
    {
      id: 6,
      createdAt: "2022-01-03T01:36:32.859Z",
      updatedAt: "2022-01-03T01:36:32.859Z",
      title: "test12",
      contents:
        "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...",
      images: [],
      author: "볼리",
      accountId: 3,
    },
    {
      id: 5,
      createdAt: "2022-01-03T01:27:08.943Z",
      updatedAt: "2022-01-03T01:27:08.943Z",
      title: "test12",
      contents:
        "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...",
      images: [".../image1.jpg"],
      author: "볼리",
      accountId: 6,
    },
    {
      id: 4,
      createdAt: "2022-01-03T01:24:00.922Z",
      updatedAt: "2022-01-03T01:24:00.922Z",
      title: "test12",
      contents:
        "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...",
      images: [".../image1.jpg"],
      author: "볼리",
      accountId: 5,
    },
    {
      id: 3,
      createdAt: "2022-01-03T01:03:03.066Z",
      updatedAt: "2022-01-03T01:03:03.066Z",
      title: "test12",
      contents:
        "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...",
      images: [".../image1.jpg"],
      author: "볼리",
      accountId: 7,
    },
    {
      id: 2,
      createdAt: "2021-12-31T05:49:12.356Z",
      updatedAt: "2021-12-31T05:49:12.356Z",
      title: "test1",
      contents:
        "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...",
      images: [],
      author: "볼리",
      accountId: 2,
    },
    {
      id: 1,
      createdAt: "2021-12-31T05:40:33.052Z",
      updatedAt: "2021-12-31T05:40:33.052Z",
      title: "test1",
      contents:
        "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...",
      images: [".../image1.jpg", ".../image2.jpg"],
      author: "볼리",
      accountId: 1,
    },
  ];

  create({ title, contents, images, author: name, accountId: id }) {
    return {
      title,
      contents,
      images,
      author: name,
      accountId: id,
      id: 17,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  }

  save(data) {
    this.#data.push(data);
    return data;
  }

  findOne(id) {
    return this.#data.find((a) => a.id === id);
  }

  delete(id) {
    for (let i = 0; i < this.#data.length; i++) {
      if (this.#data[i].id === id) {
        this.#data.splice(i, 1);
      }
    }
  }
}

describe("PostService", () => {
  let service: PostService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PostService,
        {
          provide: getRepositoryToken(PostEntity),
          useClass: MockPostRepository,
        },
      ],
    }).compile();

    service = module.get<PostService>(PostService);
  });
  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  //TODO: .find 의 옵션을 추가할 수 없음. 확인 필요
  const queryData = { page: 0, limit: 3, keyword: undefined };
  it("requestPosts 를 이용한 자료 찾기", () => {
    expect(service.requestPosts(queryData)).rejects.toStrictEqual([
      {
        id: 15,
        createdAt: "2022-01-04T08:50:17.092Z",
        updatedAt: "2022-01-04T08:50:17.092Z",
        title: "test123",
        contents:
          "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...",
        images: [".../img1.jpg", ".../img2.png"],
        author: "볼리",
      },
      {
        id: 14,
        createdAt: "2022-01-03T05:31:05.473Z",
        updatedAt: "2022-01-03T05:31:05.473Z",
        title: "test123",
        contents:
          "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...",
        images: [".../img1.jpg", ".../img2.png"],
        author: "볼리",
      },
      {
        id: 8,
        createdAt: "2022-01-03T01:44:40.891Z",
        updatedAt: "2022-01-03T01:50:04.000Z",
        title: "test12",
        contents:
          "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...",
        images: [],
        author: "볼리",
      },
    ]);
  });

  it("createPost 게시물 추가 시", () => {
    expect(
      service.createPost(
        { title: "spec test1", contents: "스펙테스트중", images: "" },
        { id: 1, name: "볼리" }
      )
    ).resolves.toStrictEqual({
      id: 17,
      createdAt: new Date(),
      updatedAt: new Date(),
      title: "spec test1",
      contents: "스펙테스트중",
      images: [],
      author: "볼리",
    });
  });

  it("createPost 게시물 추가 시 제목 적지 않은 경우", () => {
    expect(
      service.createPost(
        { title: "", contents: "스펙테스트중", images: "" },
        { id: 1, name: "볼리" }
      )
    ).rejects.toStrictEqual(
      new HttpException([errorConstant.postTitleError], 404)
    );
  });

  it("requestPostOne 이용해서 단일 게시물 조회", () => {
    expect(service.requestPostOne(15)).resolves.toStrictEqual({
      id: 15,
      createdAt: "2022-01-04T08:50:17.092Z",
      updatedAt: "2022-01-04T08:50:17.092Z",
      title: "test123",
      contents:
        "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...",
      images: [".../img1.jpg", ".../img2.png"],
      author: "볼리",
    });
  });

  it("requestPostOne 쿼리 id 가 게시물에 없는 경우", () => {
    expect(service.requestPostOne(290)).rejects.toStrictEqual(
      new NotFoundException()
    );
  });

  it("updatePost 이용해서 게시물 업데이트", () => {
    expect(
      service.updatePost(
        1,
        { title: "bravo", contents: "abcd", images: undefined },
        1
      )
    ).resolves.toStrictEqual({
      id: 1,
      createdAt: "2021-12-31T05:40:33.052Z",
      updatedAt: new Date(),
      title: "bravo",
      contents: "abcd",
      images: [],
      author: "볼리",
    });
  });

  it("updatePost title null or '' 인경우", () => {
    expect(
      service.updatePost(
        1,
        { title: "", contents: "abcd", images: undefined },
        1
      )
    ).rejects.toStrictEqual(
      new HttpException([errorConstant.postTitleError], 400)
    );
  });

  it("updatePost 타인의 글을 수정하려 할 경우", () => {
    expect(
      service.updatePost(
        1,
        { title: "test", contents: "abcd", images: undefined },
        2
      )
    ).rejects.toStrictEqual(
      new HttpException([errorConstant.postUserError], 403)
    );
  });

  it("deletePost 이용 시 해당 게시물 삭제", () => {
    expect(service.deletePost(1, 1)).resolves.toBe(undefined);
  });

  it("deletPost 타인의 글을 삭제하려 할 경우", () => {
    expect(service.deletePost(1, 2)).rejects.toStrictEqual(
      new HttpException([errorConstant.postUserError], 403)
    );
  });
});
