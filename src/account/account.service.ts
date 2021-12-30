import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import bcrypt from 'bcrypt';
import { AccountEntity } from '../entities/AccountEntity';
import { SignUpRequestDto } from './dto/signUpDto/SignUpRequestDto';
import { LogInRequestDto } from './dto/logInDto/LogInRequestDto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AccountService {
	constructor(
		@InjectRepository(AccountEntity) private accountRepository: Repository<AccountEntity>,
		private jwtService: JwtService,
	) {}

	async signUp(accountSignUpData: SignUpRequestDto) {
		let { accountId, name, email, phone, password } = accountSignUpData;
		const foundOneUser = await this.accountRepository.findOne({ where: { accountId } });

		const existHyphenPatternPhone = /010[^0][0-9]{2,3}[0-9]{3,4}/;
		const existNotHyphenPatternPhone = /010-[^0][0-9]{2,3}-[0-9]{3,4}/;

		if (phone.includes('-') && existNotHyphenPatternPhone.test(phone)) {
			phone = phone.replace(/-/g, '');
		}

		if (!(existHyphenPatternPhone.test(phone) || existNotHyphenPatternPhone.test(phone))) {
			throw new Error('핸드폰 번호를 확인 해주세요');
		}

		if (phone.includes('-') && existNotHyphenPatternPhone.test(phone)) {
			phone = phone.replace(/-/g, '');
		}

		if (foundOneUser) {
			throw new Error('존재하는 사용자 입니다.');
		}

		const bcryptedPassword = await bcrypt.hash(password, 12);
		const createUser = await this.accountRepository.save({
			accountId,
			name,
			email,
			phone,
			password: bcryptedPassword,
		});
		delete createUser.password;

		return {
			code: 201,
			row: createUser,
		};
	}

	async logIn(accountLogInData: LogInRequestDto) {
		const { accountId, password } = accountLogInData;
		const foundUserByAccountId = await this.accountRepository.findOne({ where: { accountId } });

		if (!foundUserByAccountId) {
			return {
				code: 400,
				msg: '입력값을 확인하세요',
			};
		}

		if (!(await bcrypt.compare(password, foundUserByAccountId.password))) {
			return {
				code: 400,
				msg: '입력값을 확인하세요',
			};
		}

		delete foundUserByAccountId.password;
		const payload = { accountId: accountId, id: foundUserByAccountId.id };
		const createdJwtResponse = await this.jwtService.signAsync(payload);
		return {
			code: 200,
			row: foundUserByAccountId,
			token: createdJwtResponse,
		};
	}

	async findOneByAccountId(accountId) {
		console.log(accountId);
		const foundOneUser = await this.accountRepository.findOne({ where: { accountId: accountId } });
		if (!foundOneUser) {
			return {
				code: 400,
				msg: '유저가 존재하지 않습니다.',
			};
		}
		delete foundOneUser.password;

		return {
			code: 200,
			row: foundOneUser,
		};
	}

	async findUserById(Id: number) {
		const foundOneAccount = await this.accountRepository.findOne({ where: { id: Id } });
		return foundOneAccount;
	}
}
