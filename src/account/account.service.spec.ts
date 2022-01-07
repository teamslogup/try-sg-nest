import { Test, TestingModule } from "@nestjs/testing";
import { AccountService } from "./account.service";
import { AccountEntity } from "../common/entities/account.entity";
import { getRepositoryToken } from "@nestjs/typeorm";
import { HttpException } from "@nestjs/common";
import { errorConstant } from "../common/constants/error.constant";
import { SignupRequestDtd } from "./dtos/signUpDto/signup-request.dto";

class MockAccountRepository {
  #data = [
    {
      accountId: "test12",
      createdAt: "2022-01-03T05:24:55.862Z",
      email: "",
      id: 1,
      name: "볼리",
      phone: "01012345678",
      password: expect.anything(),
      status: "active",
      updatedAt: "2022-01-03T05:24:55.862Z",
    },
    {
      id: 2,
      createdAt: "2022-01-04T01:42:58.103Z",
      updatedAt: "2022-01-04T01:42:58.103Z",
      accountId: "testidA3",
      name: "볼리",
      email: "",
      phone: "01012345678",
      password: expect.anything(),
      status: "active",
    },
    {
      id: 3,
      createdAt: "2022-01-04T01:42:58.103Z",
      updatedAt: "2022-01-04T01:42:58.103Z",
      accountId: "testidA3",
      name: "망고",
      email: "email@gmail.com",
      phone: "0109876543",
      password: expect.anything(),
      status: "active",
    },
    {
      id: 4,
      createdAt: "2022-01-04T01:42:58.103Z",
      updatedAt: "2022-01-04T01:42:58.103Z",
      accountId: "testidA3",
      name: "로렘",
      email: "test@gmail.com",
      phone: "01012341234",
      password: expect.anything(),
      status: "remove",
    },
  ];
  findOne({ where: { accountId: accountId } }) {
    const data = this.#data.find((a) => a.accountId === accountId);
    if (!data) {
      return null;
    }
    const { password, ...findData } = data;
    return findData;
  }

  create(data: Omit<SignupRequestDtd, "cert">) {
    return {
      accountId: data.accountId,
      name: data.name,
      email: data.email,
      phone: data.phone,
      password: data.password,
      id: this.#data.length + 1,
      status: "active",
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  }

  save(data) {
    this.#data.push(data);
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

  it("findOneByAccountId 통해 유저의 정보를 찾아야함.", () => {
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

  it("findOneByAccountId 을 통해 유저를 찾지못하면 404를 리턴해야한다.", () => {
    expect(service.findOneByAccountId("테스트")).toBe(null);
  });

  it("createAccount 를 통해 유저를 회원가입 시켜야한다.", () => {
    const data: SignupRequestDtd = {
      accountId: "testad12",
      name: "제시",
      email: "asdf@gmail.com",
      phone: "01012123434",
      password: "qwer1234@!",
      cert: "abcd123",
    };
    expect(service.createAccount(data)).resolves.toStrictEqual({
      accountId: "testad12",
      name: "제시",
      email: "asdf@gmail.com",
      phone: "01012123434",
      id: 5,
      createdAt: new Date(),
      updatedAt: new Date(),
      status: "active",
    });
  });

  it("createAccount 를 통해 유저를 회원가입 시 동일 유저가 있는 경우", () => {
    const data: SignupRequestDtd = {
      accountId: "test12",
      name: "제시",
      email: "asdf@gmail.com",
      phone: "01012123434",
      password: "qwer1234@!",
      cert: "abcd123",
    };
    expect(service.createAccount(data)).rejects.toStrictEqual(
      new HttpException(errorConstant.duplicatedId, 409)
    );
  });

  it("createAccount 를 통해 유저를 회원가입 시 아이디가 없는 경우", () => {
    const data: SignupRequestDtd = {
      accountId: "",
      name: "제시",
      email: "asdf@gmail.com",
      phone: "01012123434",
      password: "qwer1234@!",
      cert: "abcd123",
    };
    expect(service.createAccount(data)).rejects.toStrictEqual(
      new HttpException([errorConstant.signupEmptyName], 400)
    );
  });

  it("createAccount 를 통해 유저를 회원가입 시 아이디가 형식에 맞지 않는 경우", () => {
    const data: SignupRequestDtd = {
      accountId: "1234",
      name: "제시",
      email: "asdf@gmail.com",
      phone: "01012123434",
      password: "qwer1234@!",
      cert: "abcd123",
    };
    expect(service.createAccount(data)).rejects.toStrictEqual(
      new HttpException([errorConstant.signupInvalidId], 400)
    );
  });

  it("createAccount 를 통해 유저를 회원가입 시 핸드폰 인증토큰이 잘못된 경우", () => {
    const data: SignupRequestDtd = {
      accountId: "testId54",
      name: "제시",
      email: "asdf@gmail.com",
      phone: "01012123434",
      password: "qwer1234@!",
      cert: "abcd1234",
    };
    expect(service.createAccount(data)).rejects.toStrictEqual(
      new HttpException([errorConstant.signupWrongCert], 400)
    );
  });

  it("createAccount 를 통해 유저를 회원가입 시 이름 형식이 잘못된 경우", () => {
    const data: SignupRequestDtd = {
      accountId: "testId54",
      name: "짹",
      email: "asdf@gmail.com",
      phone: "01012123434",
      password: "qwer1234@!",
      cert: "abcd123",
    };
    expect(service.createAccount(data)).rejects.toStrictEqual(
      new HttpException([errorConstant.signupInvalidName], 400)
    );
  });

  it("createAccount 를 통해 유저를 회원가입 시 이메일 형식이 잘못된 경우", () => {
    const data: SignupRequestDtd = {
      accountId: "testId54",
      name: "제시",
      email: "asdf123",
      phone: "01012123434",
      password: "qwer1234@!",
      cert: "abcd123",
    };
    expect(service.createAccount(data)).rejects.toStrictEqual(
      new HttpException([errorConstant.signupInvalidEmail], 400)
    );
  });

  it("createAccount 를 통해 유저를 회원가입 시 비밀번호 형식이 잘못된 경우", () => {
    const data: SignupRequestDtd = {
      accountId: "testId54",
      name: "제시",
      email: "asdf123@gmail.com",
      phone: "01012123434",
      password: "qwer1234",
      cert: "abcd123",
    };
    expect(service.createAccount(data)).rejects.toStrictEqual(
      new HttpException([errorConstant.signupInvalidPassword], 400)
    );
  });

  it("createAccount 를 통해 유저를 회원가입 시 핸드폰 번호 형식이 잘못된 경우", () => {
    const data: SignupRequestDtd = {
      accountId: "testId54",
      name: "제시",
      email: "asdf123@gmail.com",
      phone: "0101212",
      password: "qwer1234@!",
      cert: "abcd123",
    };
    expect(service.createAccount(data)).rejects.toStrictEqual(
      new HttpException([errorConstant.signupInvalidPhone], 400)
    );
  });

  it("createAccount 를 통해 유저를 회원가입 시 이름이 없는 경우", () => {
    const data: SignupRequestDtd = {
      accountId: "testId54",
      name: "",
      email: "asdf123@gmail.com",
      phone: "01012123434",
      password: "qwer1234@!",
      cert: "abcd123",
    };
    expect(service.createAccount(data)).rejects.toStrictEqual(
      new HttpException([errorConstant.signupEmptyName], 400)
    );
  });

  it("createAccount 를 통해 유저를 회원가입 시 핸드폰번호가 없는 경우", () => {
    const data: SignupRequestDtd = {
      accountId: "testId54",
      name: "제시",
      email: "asdf123@gmail.com",
      phone: "",
      password: "qwer1234@!",
      cert: "abcd123",
    };
    expect(service.createAccount(data)).rejects.toStrictEqual(
      new HttpException([errorConstant.signupEmptyPhone], 400)
    );
  });

  it("createAccount 를 통해 유저를 회원가입 시 비밀번호가 없는 경우", () => {
    const data: SignupRequestDtd = {
      accountId: "testId54",
      name: "제시",
      email: "asdf123@gmail.com",
      phone: "01012123434",
      password: "",
      cert: "abcd123",
    };
    expect(service.createAccount(data)).rejects.toStrictEqual(
      new HttpException([errorConstant.signupEmptyPassword], 400)
    );
  });

  it("createAccount 를 통해 유저를 회원가입 시 토큰이 없는 경우", () => {
    const data: SignupRequestDtd = {
      accountId: "testId54",
      name: "제시",
      email: "asdf123@gmail.com",
      phone: "01012123434",
      password: "qwer1234@!",
      cert: "",
    };
    expect(service.createAccount(data)).rejects.toStrictEqual(
      new HttpException([errorConstant.signupEmptyToken], 400)
    );
  });

  it("duplicateAccountId 를 이용해 유저아이디 중복여부를 확인", () => {
    expect(service.duplicateAccountId("test156")).resolves.toBe(undefined);
  });

  it("duplicateAccountId 유저아이디가 중복일 경우", () => {
    expect(service.duplicateAccountId("test12")).rejects.toStrictEqual(
      new HttpException(errorConstant.duplicatedId, 409)
    );
  });

  it("sendMessage 를 이용해 핸드폰 유효성검사하기", () => {
    expect(service.sendMessage("01012345678")).toBeTruthy();
  });

  it("sendMessage 를 이용해 핸드폰 형식이 다른 경우", () => {
    expect(service.sendMessage("123456")).rejects.toStrictEqual(
      new HttpException(
        [
          {
            code: "invalidPhone",
            msg: "유효하지 않은 전화번호 형식입니다.",
            value: "123456",
          },
        ],
        400
      )
    );
  });

  it("sendMessage 이용 시 휴대폰 번호를 작성하지 않은 경우", () => {
    expect(service.sendMessage("")).rejects.toStrictEqual(
      new HttpException([errorConstant.sendMessageEmptyPhone], 400)
    );
  });

  it("checkMessage 를 활용해 핸드폰 유효 토큰 넣어주기", () => {
    expect(service.checkMessage("01012123434", "0531")).resolves.toStrictEqual({
      cert: "abcd123",
      certExpiredAt: Date(),
    });
  });

  it("checkMessage 이용 시 핸드폰 형식이 다를 경우", () => {
    expect(service.checkMessage("0101234", "0531")).rejects.toStrictEqual(
      new HttpException(
        [
          {
            code: "invalidPhone",
            msg: "유효하지 않은 전화번호 형식입니다.",
            value: "123456",
          },
        ],
        400
      )
    );
  });

  it("checkMessage 이용 시 휴대폰 번호를 작성하지 않은 경우", () => {
    expect(service.checkMessage("", "0531")).rejects.toStrictEqual(
      new HttpException([errorConstant.sendMessageEmptyPhone], 400)
    );
  });

  it("checkMessage 이용 시 authCode 가 틀릴 경우", () => {
    expect(service.checkMessage("01012345678", "0541")).rejects.toStrictEqual(
      new HttpException(
        [
          {
            code: "wrongAuthCode",
            msg: "잘못된 인증코드입니다.",
            value: "0541",
          },
        ],
        401
      )
    );
  });
});
