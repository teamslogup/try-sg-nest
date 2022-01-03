import { Body, Controller, Delete, Get, Param, Post, Req, Res, UseInterceptors } from '@nestjs/common';
import { AccountService } from './account.service';
import { UndefinedToNullInterceptor } from '../common/interceptors/undefinedToNull.interceptor';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JoinRequestDto } from './dto/join.request.dto';
import { UserDto } from '../common/dto/user.dto';
import { LoginFailDto } from './dto/login.fail.dto';
import { LoginUserDto } from './dto/login.user.dto';

@ApiTags('Account')
@UseInterceptors(UndefinedToNullInterceptor)
@Controller('account')
export class AccountController {
	constructor(private AccountService: AccountService) {}

	@ApiOperation({ summary: '유저 정보 조회' })
	@Get('sessions/me')
	async getProfile(@Req() req) {
		await this.AccountService.getProfile(req);
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
	async logIn(@Body() data: LoginUserDto, @Res() res) {
		await this.AccountService.logIn(data, res);
	}

	@ApiOperation({ summary: '로그아웃' })
	@Delete('/sessions/me')
	async logOut(@Req() req) {
		await this.AccountService.logOut(req);
	}

	@ApiParam({
		name: 'id',
		required: true,
		description: '유저가 입력한 아이디',
	})
	@ApiOperation({ summary: '아이디 중복 확인' })
	@Get('/sessions/me/:userId')
	async checkDuplicationId(@Param() param) {
		await this.AccountService.checkDuplicationId(param.userId);
	}

	@ApiResponse({
		type: JoinRequestDto,
		status: 201,
		description: '회원가입 성공',
	})
	@ApiResponse({
		type: JoinRequestDto,
		status: 400,
		description: '모든 회원가입 실패 케이스',
	})
	@ApiOperation({ summary: '회원가입' })
	@Post('/users')
	async signUp(@Body() body: JoinRequestDto) {
		return await this.AccountService.signUp(body);
	}
}
