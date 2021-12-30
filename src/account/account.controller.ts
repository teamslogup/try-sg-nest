import { Body, Controller, Get, HttpStatus, Post, Req, Res, UseGuards } from '@nestjs/common';
import {
	ApiCreatedResponse,
	ApiHeader,
	ApiInternalServerErrorResponse,
	ApiOkResponse,
	ApiOperation,
	ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

import { Request, Response } from 'express';

import { AccountService } from './account.service';

import { SignUpRequestDto } from './dto/signUpDto/SignUpRequestDto';
import { LogInRequestDto } from './dto/logInDto/LogInRequestDto';
import { SignUpResponseDto } from './dto/signUpDto/SignUpResponseDto';
import { ErrorResponseDto } from 'src/common/ErrorResponseDto';
import { LogInResponseDto } from './dto/logInDto/LogInResponseDto';

import { BAD_REQUEST } from 'src/common/requestMessage';
import { SERVER_ERROR } from 'src/common/responseMessage';
import { ApiBadRequestResponse } from '@nestjs/swagger';

@ApiInternalServerErrorResponse({
	description: SERVER_ERROR,
})
@ApiBadRequestResponse({ description: BAD_REQUEST, type: ErrorResponseDto, status: 400 })
@ApiTags('ACCOUNT')
@Controller('account')
export class AccountController {
	constructor(private accountService: AccountService) {}

	@ApiOperation({ summary: '회원가입' })
	@ApiCreatedResponse({
		description: 'SIGNUP SUCCESS',
		type: SignUpResponseDto,
	})
	@Post('users')
	async signUp(@Body() data: SignUpRequestDto) {
		try {
			return await this.accountService.signUp(data);
		} catch (error) {
			console.log(error);
		}
	}

	@ApiOperation({ summary: '로그인' })
	@ApiOkResponse({
		status: 200,
		description: 'LOGIN SUCCESS',
		type: LogInResponseDto,
	})
	@Post('sessions/me')
	async logIn(@Body() data: LogInRequestDto) {
		try {
			return await this.accountService.logIn(data);
		} catch (error) {
			console.log(error);
		}
	}

	@ApiOkResponse({
		description: 'SUCCESS',
		type: LogInResponseDto,
	})
	@ApiOperation({ summary: '내 정보조회' })
	@UseGuards(AuthGuard('jwt'))
	@ApiHeader({
		name: 'authorization',
		description: 'header token',
	})
	@Get('sessions/me')
	async getProfile(@Req() req: Request) {
		const { accountId, user } = req.user as any;
		try {
			return await this.accountService.findOneByAccountId(accountId);
		} catch (error) {
			console.log(error);
		}
	}
}
