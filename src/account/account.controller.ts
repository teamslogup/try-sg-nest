import { Body, Controller, Delete, Get, Param, Post, UseInterceptors } from '@nestjs/common';
import { JoinRequestDto } from './dto/join.request.dto';
import { LoginUserDto } from './dto/login.user.dto';
import { AccountService } from './account.service';
import { UndefinedToNullInterceptor } from '../common/interceptors/undefinedToNull.interceptor';

@UseInterceptors(UndefinedToNullInterceptor)
@Controller('account')
export class AccountController {
	constructor(private AccountService: AccountService) {}

	@Get()
	getUser() {}

	@Get('/sessions/me/:userId')
	checkDuplicationId(@Param() param) {
		this.AccountService.checkDuplicationId(param.userId);
	}

	@Post('/users')
	signUp(@Body() data: JoinRequestDto) {
		this.AccountService.signUp(data);
	}

	@Post('/sessions/me')
	logIn(@Body() data: LoginUserDto) {
		this.AccountService.logIn(data);
	}

	@Delete('/sessions/me')
	logOut() {}
}
