import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable } from '@nestjs/common';

// TODO: 토큰에 저장된 정보를 확인하기 전에 passport의 jwt-strategy를 사용하여 토큰 검증
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor() {
		super({
			jwtFromRequest: ExtractJwt.fromHeader('x-auth-token'), // 토큰 종류
			ignoreExpiration: false, // 만료된 토큰 사용 불가 옵션
			secretOrKey: process.env['JWT_SECRET'], // jwt secret key
		});
	}

	async validate(payload: any) {
		const { id, accountId, name, email, phone } = payload;
		return { id, accountId, name, email, phone };
	}
}
