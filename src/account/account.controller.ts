import { Body, Controller, Delete, Get, Param, Post, UseInterceptors } from '@nestjs/common';
import { AccountService } from './account.service';
import { UndefinedToNullInterceptor } from '../common/interceptors/undefinedToNull.interceptor';
import { JoinRequestDto } from './dto/join.request.dto';
import { LoginUserDto } from './dto/login.user.dto';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserDto } from '../common/dto/user.dto';
import { LoginFailDto } from './dto/login.fail.dto';

@ApiTags('User')
@UseInterceptors(UndefinedToNullInterceptor)
@Controller('account')
export class AccountController {
	constructor(private AccountService: AccountService) {}

	@ApiOperation({ summary: '유저 정보 조회' })
	@Get()
	getUser() {}

	@ApiParam({
		name: 'id',
		required: true,
		description: '유저가 입력한 아이디',
	})
	@ApiOperation({ summary: '아이디 중복 확인' })
	@Get('/sessions/me/:userId')
	checkDuplicationId(@Param() param) {
		this.AccountService.checkDuplicationId(param.userId);
	}

	@ApiOperation({ summary: '회원가입' })
	@Post('/users')
	signUp(@Body() body: JoinRequestDto) {
		// this.AccountService.signUp(body);
	}

	@ApiResponse({
		type: UserDto,
		status: 200,
		description: '로그인 성공',
	})
	@ApiResponse({
		type: LoginFailDto,
		status: 401,
		description: '로그인 실패',
	})
	@ApiOperation({ summary: '로그인' })
	@Post('/sessions/me')
	logIn(@Body() data: LoginUserDto) {
		// this.AccountService.logIn(data);
	}

	@ApiOperation({ summary: '로그아웃' })
	@Delete('/sessions/me')
	logOut() {}
}
