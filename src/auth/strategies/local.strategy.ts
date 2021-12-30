import { ForbiddenException, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { AuthService } from '../auth.service';
import { Strategy } from 'passport-local';
import * as bcrypt from 'bcrypt';
import { LoginUserDto } from '../../account/dto/login.user.dto';

// TODO: login 함수 수행 전 id, password 검증
@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
	constructor(private authService: AuthService) {
		super({
			usernameField: 'userId',
		});
	}

	async validate(user: LoginUserDto): Promise<any> {
		const userInfo = await this.authService.validateUser(user);

		// TODO: 없는 유저일 경우 -> 메시지 추후 수정
		if (!userInfo) {
			throw new ForbiddenException({
				code: '',
				message: '존재하지 않는 회원입니다.',
				value: {},
			});
		}

		// TODO: 잘못된 사용자 정보를 받았을 때(비밀번호 인증 실패 1회차)
		const isMatch = await bcrypt.compare(user.password, userInfo.password);

		if (!isMatch && user.errorCount === 0) {
			throw new ForbiddenException({
				code: '',
				message: [`비밀번호가 틀렸습니다.`],
				errorCount: user.errorCount++,
			});
		}

		// TODO: 비밀번호 인증 실패 2회차
		// TODO: 비밀번호 인증 실패 3회차

		return userInfo;
	}
}
