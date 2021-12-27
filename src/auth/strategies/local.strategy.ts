import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { AuthService } from '../auth.service';
import { Strategy } from 'passport-local';
import { LoginUserDto } from '../../account/dto/login-user.dto';

// TODO: login 함수 수행 전 id, password 검증
@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
	constructor(private authService: AuthService) {
		super({
			usernameField: 'userId',
		});
	}

	async validate(userId: string, password: string): Promise<any> {
		const loginUserDto: LoginUserDto = {
			userId: userId,
			password: password,
		};
		const user = await this.authService.validateUser(loginUserDto);

		if (!user) {
			throw new UnauthorizedException();
		}
		return user;
	}
}
