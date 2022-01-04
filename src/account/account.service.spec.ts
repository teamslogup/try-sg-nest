import { Test, TestingModule } from "@nestjs/testing";
import { AccountService } from "./account.service";
import { AccountEntity } from "../entities/Account.entity";
import { getRepositoryToken } from "@nestjs/typeorm";

class MockAccountRepository {
  #data = [
    {
      accountId: "test12",
      createdAt: "2022-01-03T05:24:55.862Z",
      email: "",
      id: 1,
      name: "볼리",
      phone: "01012345678",
      status: "active",
      updatedAt: "2022-01-03T05:24:55.862Z",
    },
  ];
  findOne({ where: { accountId } }) {
    const data = this.#data.find((a) => a.accountId === accountId);
    if (!data) {
      return null;
    }
    return data;
  }
}

describe("AccountService", () => {
  let service: AccountService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AccountService,
        {
          provide: getRepositoryToken(AccountEntity),
          useClass: MockAccountRepository,
        },
      ],
    }).compile();

    service = module.get<AccountService>(AccountService);
  });
  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("findOneByAccountId 통해 유저의 정보를 찾아야함.", async () => {
    expect(service.findOneByAccountId("test12")).toStrictEqual({
      accountId: "test12",
      name: "볼리",
      email: "",
      phone: "01012345678",
      id: 1,
      createdAt: "2022-01-03T05:24:55.862Z",
      updatedAt: "2022-01-03T05:24:55.862Z",
      status: "active",
    });
  });

  it("findOneByAccountId 을 통해 유저를 찾지못하면 404를 리턴해야한다.", async () => {
    expect(service.findOneByAccountId("테스트")).toBe(null);
  });
});
