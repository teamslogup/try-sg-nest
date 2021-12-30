import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { log } from 'console';
import dotenv from 'dotenv';
dotenv.config();

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor() {
		super({
			jwtFromRequest: ExtractJwt.fromHeader('authorization'),
			ignoreExpiration: false,
			secretOrKey: process.env.JWT,
		});
	}

	async validate(payload: any) {
		log('jwt.strategy payload : ', payload);
		return { accountId: payload.accountId, id: payload.id };
	}
}
