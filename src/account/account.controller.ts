import {
  Body,
  Controller,
  Delete,
  Get,
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
    @Body() data: SignUpRequestDto,
    @Res() res
  ): Promise<Response> {
    return await this.accountService.createAccount(data, res);
  }

  @Post("sessions/me")
  async loginUser(
    @Body() data: loginRequestDto,
    @Res() res
  ): Promise<Response> {
    return await this.accountService.loginAccount(data, res);
  }

  @Get("sessions/me")
  @UseGuards(JwtAuthGuard)
  findUser(
    @CurrentUser() account: AccountEntity,
    @CurrentToken() token: string,
    @Res() res
  ): Response {
    return res.set({ "x-auth-token": token }).json({ row: account });
  }

  @Delete("sessions/me")
  @UseGuards(JwtAuthGuard)
  logOutUser(@Res() res): Response {
    return res.status(204).json();
  }

  @Get("id-duplication/:accountId")
  duplicateUser(@Param("accountId") accountId: string, @Res() res): any {
    return this.accountService.duplicateAccountId(accountId, res);
  }
}

@Controller("sender")
export class SenderController {
  constructor(private readonly accountService: AccountService) {}

  @Post("message-auth-tokens")
  sendMessageAuthToken(@Body("phone") phone: string, @Res() res): any {
    return this.accountService.sendMessage(phone, res);
  }

  @Post("message-auth-tokens/:authCode/verification")
  checkMessageAuthToken(
    @Body("phone") phone: string,
    @Param("authCode") authCode: string,
    @Res() res
  ): any {
    return this.accountService.checkMessage(phone, authCode, res);
  }
}
