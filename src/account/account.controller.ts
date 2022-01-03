import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Res,
  UseGuards,
} from "@nestjs/common";
import { AccountService } from "./account.service";
import { SignUpRequestDto } from "./dto/signUpDto/SignUpRequestDto";
import { loginRequestDto } from "./dto/signUpDto/login.request.dto";
import { JwtAuthGuard } from "../common/guards/auth.guard";
import { CurrentUser } from "../common/decorators/currentUser.decorator";
import { AccountEntity } from "../entities/Account.entity";
import { CurrentToken } from "../common/decorators/currenToken.decorator";

@Controller("account")
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Post("users")
  async createUser(
    @Body() data: SignUpRequestDto
  ): Promise<Omit<AccountEntity, "password">> {
    return await this.accountService.createAccount(data);
  }

  @Post("sessions/me")
  async loginUser(
    @Body() data: loginRequestDto,
    @Res() res
  ): Promise<AccountEntity> {
    return await this.accountService.loginAccount(data, res);
  }

  @Get("sessions/me")
  @UseGuards(JwtAuthGuard)
  findUser(
    @CurrentUser() account: AccountEntity,
    @CurrentToken() token: string,
    @Res() res
  ): AccountEntity {
    return res.set({ "x-auth-token": token }).json({ row: account });
  }

  @Delete("sessions/me")
  @UseGuards(JwtAuthGuard)
  @HttpCode(204)
  logOutUser(): void {
    return;
  }

  @Get("id-duplication/:accountId")
  @HttpCode(204)
  async duplicateAccountId(
    @Param("accountId") accountId: string
  ): Promise<void> {
    return await this.accountService.duplicateAccountId(accountId);
  }
}

@Controller("sender")
export class SenderController {
  constructor(private readonly accountService: AccountService) {}

  @Post("message-auth-tokens")
  @HttpCode(204)
  sendMessageAuthToken(@Body("phone") phone: string): void {
    return this.accountService.sendMessage(phone);
  }

  @Post("message-auth-tokens/:authCode/verification")
  async checkMessageAuthToken(
    @Body("phone") phone: string,
    @Param("authCode") authCode: string
  ): Promise<Object> {
    return this.accountService.checkMessage(phone, authCode);
  }
}
