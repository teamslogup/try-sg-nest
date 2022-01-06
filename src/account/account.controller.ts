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
import { SignUpRequestDto } from "./dtos/signUpDto/SignUpRequestDto";
import { JwtAuthGuard } from "../common/guards/auth.guard";
import { CurrentUser } from "../common/decorators/current-user.decorator";
import { AccountEntity } from "../common/entities/account.entity";
import { CurrentToken } from "../common/decorators/current-token.decorator";
import { checkMessageAuthToken } from "./dtos/signUpDto/MessageAuthToken.request.dto";
import { ApiOperation } from "@nestjs/swagger";
import { LocalGuard } from "../common/guards/local.guard";

@Controller("account")
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @ApiOperation({ summary: "회원가입" })
  @Post("users")
  async createUser(
    @Body() data: SignUpRequestDto
  ): Promise<Omit<AccountEntity, "password">> {
    return await this.accountService.createAccount(data);
  }

  @ApiOperation({ summary: "로그인" })
  @Post("sessions/me")
  @UseGuards(LocalGuard)
  async loginUser(
    @CurrentUser() user: { token: string; body: AccountEntity },
    @Res() res
  ): Promise<Response> {
    return await res
      .set({ "x-auth-token": user.token })
      .json({ row: user.body });
  }

  @ApiOperation({ summary: "내정보 조회" })
  @Get("sessions/me")
  @UseGuards(JwtAuthGuard)
  findUser(
    @CurrentUser() account: AccountEntity,
    @CurrentToken() token: string,
    @Res() res
  ): AccountEntity {
    return res.set({ "x-auth-token": token }).json({ row: account });
  }

  @ApiOperation({ summary: "로그아웃" })
  @Delete("sessions/me")
  @UseGuards(JwtAuthGuard)
  @HttpCode(204)
  logOutUser(): void {
    return;
  }

  @ApiOperation({ summary: "아이디 중복확인" })
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

  @ApiOperation({ summary: "문자 인증코드 발송" })
  @Post("message-auth-tokens")
  @HttpCode(204)
  sendMessageAuthToken(@Body() body: checkMessageAuthToken): Promise<void> {
    return this.accountService.sendMessage(body.phone);
  }

  @ApiOperation({ summary: "문자 인증코드 확인" })
  @Post("message-auth-tokens/:authCode/verification")
  async checkMessageAuthToken(
    @Body() body: checkMessageAuthToken,
    @Param("authCode") authCode: string
  ): Promise<Object> {
    return this.accountService.checkMessage(body.phone, authCode);
  }
}
