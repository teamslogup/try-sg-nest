import { ForbiddenException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Accounts } from '../entities/AccountEntity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from '../account/dto/login-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
	constructor(
		@InjectRepository(Accounts)
		private accountRepository: Repository<Accounts>,
		private jwtService: JwtService,
	) {}

	// TODO: 사용자 인증 실패 케이스
	async validateUser(loginUserDto: LoginUserDto): Promise<any> {
		const user = await this.accountRepository.findOne({ userId: loginUserDto.userId });

		// TODO: 없는 유저일 경우 -> 메시지 추후 수정
		if (!user) {
			throw new ForbiddenException({
				statusCode: HttpStatus.UNAUTHORIZED, //401
				message: [`없는 회원입니다.`],
				error: 'Unauthorized',
			});
		}
		// TODO: 잘못된 사용자 정보를 받았을 때(비밀번호 인증 실패)
		const isMatch = await bcrypt.compare(loginUserDto.password, user.password);

		if (isMatch) {
			const { password, ...result } = user;
			return result; // password 제외하고 나머지 유저 정보 리턴
		} else {
			throw new ForbiddenException({
				statusCode: HttpStatus.UNAUTHORIZED,
				message: [`사용자 정보가 일치하지 않습니다.`],
				error: 'Unauthorized',
			});
		}
	}

	// TODO: 사용자 정보 인증 성공
	async login(user: any) {
		const payload = {
			id: user.id,
			accountId: user.accountId /*name: user.name,*/,
			email: user.email,
			phone: user.phone,
		};
		return {
			accessToken: this.jwtService.sign(payload),
		};
	}
}