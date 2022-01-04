import { HttpException, Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import * as bcrypt from "bcrypt";
import { AccountEntity } from "../entities/Account.entity";
import { SignUpRequestDto } from "./dto/signUpDto/SignUpRequestDto";
import { errorConstant } from "../common/constants/error.constant";
import AccountStatusTypes from "../common/types/accountStatusType";

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(AccountEntity)
    private accountRepository: Repository<AccountEntity>
  ) {}

  findOne(id: number) {
    return this.accountRepository.findOne(id);
  }

  async createAccount(
    data: SignUpRequestDto
  ): Promise<Omit<AccountEntity, "password">> {
    const duplicateId = await this.accountRepository.findOne({
      where: { accountId: data.accountId },
    });

    if (duplicateId) {
      throw new HttpException([errorConstant.duplicatedId], 400);
    }
    this.errorCheckSignUp(data);
    const { cert, ...accountInfo } = data;
    const createAccount = await this.accountRepository.create(accountInfo);
    createAccount.password = await bcrypt.hash(data.password, 10);
    const saveAccount = await this.accountRepository.save(createAccount);
    const { password, ...accountParam } = saveAccount;
    return accountParam;
  }

  findOneByAccountId(accountId: string): Promise<AccountEntity> {
    return this.accountRepository.findOne({ where: { accountId } });
  }

  async loginAccount(
    accountId: string,
    password: string
  ): Promise<AccountEntity> {
    const account = await this.findOneByAccountId(accountId);
    if (!account) {
      const payload = errorConstant.loginInvalidAccount;
      payload.value = { accountId };
      throw new HttpException([payload], 404);
    }

    if (account.status === AccountStatusTypes.LOCKED) {
      throw new HttpException([errorConstant.loginLockedSignIn], 404);
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
      throw new HttpException([errorConstant.loginWrongPasswordThree], 404);
    } else if (
      !isComparePassword &&
      account.status === AccountStatusTypes.PASSWORDFIRSTFAIL
    ) {
      account.status = AccountStatusTypes.PASSWORDSECONDFAIL;
      await this.accountRepository.save(account);
      throw new HttpException([errorConstant.loginWrongPasswordTwo], 404);
    } else if (!isComparePassword) {
      account.status = AccountStatusTypes.PASSWORDFIRSTFAIL;
      await this.accountRepository.save(account);
      throw new HttpException([errorConstant.loginWrongPasswordOne], 404);
    }

    if (account.status !== AccountStatusTypes.ACTIVE) {
      account.status = AccountStatusTypes.ACTIVE;
      await this.accountRepository.save(account);
    }

    return account;
  }

  async duplicateAccountId(accountId: string): Promise<void> {
    const duplicateId = await this.accountRepository.findOne({
      where: { accountId },
    });
    if (!duplicateId) {
      return;
    }
    throw new HttpException([errorConstant.duplicatedId], 409);
  }

  async sendMessage(phone: string): Promise<void> {
    const phonePattern = /^01[0-9]{8,9}$/;
    if (!phonePattern.test(phone)) {
      const payload = errorConstant.sendMessageWrongPhone;
      payload.value = phone;
      throw new HttpException([payload], 400);
    }
    if (!phone) {
      throw new HttpException([errorConstant.sendMessageEmptyPhone], 400);
    }
    return;
  }

  async checkMessage(phone: string, authCode: string): Promise<Object> {
    if (authCode !== "0531") {
      const payload = errorConstant.sendMessageInvalidCode;
      payload.value = authCode;
      throw new HttpException([payload], 401);
    }
    const phonePattern = /^01[0-9]{8,9}$/;
    if (!phonePattern.test(phone)) {
      const payload = errorConstant.sendMessageWrongPhone;
      payload.value = phone;
      throw new HttpException([payload], 400);
    }
    if (!phone) {
      throw new HttpException([errorConstant.sendMessageEmptyPhone], 400);
    }
    //TODO: +3분 더해주기 ...
    const time = new Date();
    time.setHours(time.getHours() + 9);
    time.setMinutes(time.getMinutes() + 3);
    return { cert: "abcd123", certExpiredAt: time };
  }

  errorCheckSignUp(data: SignUpRequestDto) {
    const pwPattern =
      /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,}$/;
    const namePattern = /^[가-힣]{2,}|[a-zA-Z]{2,}$/;
    const emailPattern =
      /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
    const idPattern = /^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]{6,}$/;
    const phonePattern = /^01[0-9]{8,9}$/;
    const payload = [];
    if (data.cert !== "abcd123") {
      const inputPayload = errorConstant.signupWrongCert;
      inputPayload.value = data.cert;
      payload.push(inputPayload);
    }
    if (!idPattern.test(data.accountId)) {
      const inputPayload = errorConstant.signupInvalidId;
      inputPayload.value = data.accountId;
      payload.push(inputPayload);
    }
    if (!namePattern.test(data.name)) {
      const inputPayload = errorConstant.signupInvalidName;
      inputPayload.value = data.name;
      payload.push(inputPayload);
    }
    if (!emailPattern.test(data.email) && data.email) {
      const inputPayload = errorConstant.signupInvalidEmail;
      inputPayload.value = data.email;
      payload.push(inputPayload);
    }
    if (!pwPattern.test(data.password)) {
      payload.push(errorConstant.signupInvalidPassword);
    }
    if (!phonePattern.test(data.phone)) {
      const inputPayload = errorConstant.signupInvalidPhone;
      inputPayload.value = data.phone;
      payload.push(inputPayload);
    }
    if (!data.accountId) {
      payload.push(errorConstant.signupEmptyId);
    }
    if (!data.name) {
      payload.push(errorConstant.signupEmptyName);
    }
    if (!data.phone) {
      payload.push(errorConstant.signupEmptyPhone);
    }
    if (!data.password) {
      payload.push(errorConstant.signupEmptyPassword);
    }
    if (!data.cert) {
      payload.push(errorConstant.signupEmptyToken);
    }

    if (payload.length > 0) {
      throw new HttpException(payload, 400);
    }
  }
}
