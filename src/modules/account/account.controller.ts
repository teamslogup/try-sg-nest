import { Body, Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiHeader,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { AccountService } from './account.service';
import { User } from './entity/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@ApiTags('account')
@Controller('account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  /**
   * 회원가입
   */
  @ApiOperation({
    summary: '회원가입',
  })
  @ApiCreatedResponse({
    type: User,
  })
  @Post('/users')
  async signUp(@Body() createUserDto: CreateUserDto) {
    // TODO: implement methods!
    // return await this.accountService.createUser()
  }

  /**
   * 로그인
   */
  @ApiOperation({
    summary: '로그인',
  })
  @Post('sessions/me')
  login() {
    // TODO: implement methods!
  }

  /**
   * 로그인 사용자 정보 조회
   */
  @ApiOperation({
    summary: '로그인 사용자 정보 조회',
  })
  @ApiHeader({
    name: 'x-auth-token',
  })
  @Get('sessions/me')
  me() {
    // TODO: implement methods!
  }

  /**
   * 로그아웃
   */
  @ApiOperation({
    summary: '로그아웃',
  })
  @ApiHeader({
    name: 'x-auth-token',
  })
  @Delete()
  logout() {
    // TODO: implement methods!
  }

  /**
   * 회원정보 수정
   */
  @ApiOperation({
    summary: '회원정보 수정',
  })
  @ApiHeader({
    name: 'x-auth-token',
  })
  @Patch()
  updateUserInfo(@Body() updateUserDto: UpdateUserDto) {
    // TODO: implement methods!
  }
}
