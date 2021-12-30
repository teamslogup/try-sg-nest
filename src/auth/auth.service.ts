import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Accounts } from '../entities/Accounts';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from '../account/dto/login.user.dto';

@Injectable()
export class AuthService {
	constructor(
		@InjectRepository(Accounts)
		private accountRepository: Repository<Accounts>,
		private jwtService: JwtService,
	) {}

	async validateUser(user: LoginUserDto): Promise<any> {
		const userInfo = await this.accountRepository.findOne({ userId: user.userId });

		if (userInfo) {
			const { password, ...result } = userInfo;
			return result; // password 제외하고 나머지 유저 정보 리턴
		}
		return null;
	}
}
