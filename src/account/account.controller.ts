import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  Post,
  Req,
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
  createUser(@Body() data: SignUpRequestDto, @Res() res): any {
    return this.accountService.createAccount(data, res);
  }

  @Post("sessions/me")
  loginUser(@Body() data: loginRequestDto, @Res() res): any {
    return this.accountService.loginAccount(data, res);
  }

  @Get("sessions/me")
  @UseGuards(JwtAuthGuard)
  findUser(
    @CurrentUser() account: AccountEntity,
    @CurrentToken() token: string,
    @Res() res
  ): any {
    return res.set({ "x-auth-token": token }).json({ row: account });
  }

  @Delete("sessions/me")
  @UseGuards(JwtAuthGuard)
  logOutUser(@Res() res): any {
    return res;
  }
  //
  //   @Get('id-duplication/:accountId')
  //   validateUser(@Req() req): any {
  //     return this.usersService.validateUser();
  //   }
  // }
  //
}

@Controller("sender")
export class SenderController {}
