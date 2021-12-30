import { HttpException, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import * as bcrypt from "bcrypt";
import { AccountEntity } from "../entities/Account.entity";
import { SignUpRequestDto } from "./dto/signUpDto/SignUpRequestDto";
import { loginRequestDto } from "./dto/signUpDto/login.request.dto";
import { errorConstants } from "../common/constants/error.constants";
import AccountStatusTypes from "../common/types/accountStatusType";

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(AccountEntity)
    private accountRepository: Repository<AccountEntity>,
    private jwtService: JwtService
  ) {}

  async createAccount(data: SignUpRequestDto, res): Promise<any> {
    // const payload = [];
    // if()

    const createAccount = await this.accountRepository.create(data);
    createAccount.password = await bcrypt.hash(data.password, 10);
    await this.accountRepository.save(createAccount);
    return res.status(204).json();

    // throw new HttpException(payload, 404);
  }

  findOneByAccountId(accountId: string): Promise<AccountEntity> {
    return this.accountRepository.findOne({ where: { accountId } });
  }

  async duplicateAccountId(accountId: string): Promise<any> {
    const findAccount = await this.findOneByAccountId(accountId);
    if (findAccount) {
      // throw new HttpException();
    }
  }

  async loginAccount(data: loginRequestDto, res) {
    const { accountId, password } = data;
    const account = await this.findOneByAccountId(accountId);
    if (!account) {
      const payload = errorConstants.loginInvalidAccount;
      payload.value = { accountId };
      throw new HttpException(payload, 404);
    }

    if (account.status === AccountStatusTypes.LOCKED) {
      const payload = errorConstants.loginLockedSignIn;
      throw new HttpException(payload, 404);
    }

    const accountSelect = await this.accountRepository
      .createQueryBuilder("accounts")
      .where("accounts.accountId = :accountId", { accountId })
      .addSelect("accounts.password")
      .getOne();

    const isComparePassword = await bcrypt.compare(
      password,
      accountSelect.password
    );

    if (
      !isComparePassword &&
      account.status === AccountStatusTypes.PASSWORDSECONDFAIL
    ) {
      account.status = AccountStatusTypes.LOCKED;
      await this.accountRepository.save(account);
      const payload = errorConstants.loginWrongPasswordThree;
      throw new HttpException(payload, 404);
    } else if (
      !isComparePassword &&
      account.status === AccountStatusTypes.PASSWORDFIRSTFAIL
    ) {
      account.status = AccountStatusTypes.PASSWORDSECONDFAIL;
      await this.accountRepository.save(account);
      const payload = errorConstants.loginWrongPasswordTwo;
      throw new HttpException(payload, 404);
    } else if (!isComparePassword) {
      account.status = AccountStatusTypes.PASSWORDFIRSTFAIL;
      await this.accountRepository.save(account);
      const payload = errorConstants.loginWrongPasswordOne;
      throw new HttpException(payload, 404);
    }

    if (account.status !== AccountStatusTypes.ACTIVE) {
      account.status = AccountStatusTypes.ACTIVE;
      await this.accountRepository.save(account);
    }
    const payload = {
      id: account.id,
      sub: account.accountId,
    };
    const jwtToken = this.jwtService.sign(payload);
    return res.set({ "x-auth-token": jwtToken }).json({ row: account });
  }

  async checkAuthToken(token: string) {
    return this.jwtService.decode(token);
  }
}
