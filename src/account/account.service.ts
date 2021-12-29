import { BadRequestException, ConflictException, HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Accounts } from '../entities/Accounts';
import { Repository } from 'typeorm';
import { JoinRequestDto } from './dto/join.request.dto';
import bcrypt from 'bcrypt';

// import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AccountService {
	constructor(
		@InjectRepository(Accounts)
		private accountRepository: Repository<Accounts>, // private jwtService: JwtService,
	) {}

	async checkDuplicationId(userId: string) {
		const searchId = await this.accountRepository.findOne({ where: { userId: userId } });
		const idRegex = /^[A-Za-z0-9+]{6, 10}$/; // TODO: 정규표현식 수정 필요
		console.log(userId);
		if (searchId) {
			throw new ConflictException({
				code: 'duplicatedId',
				message: '중복된 아이디입니다.',
			});
		}
		// 형식에 맞지 않는 아이디일 때
		if (!idRegex.test(userId)) {
			throw new BadRequestException({
				code: 'invalidId',
				message: '유효하지 않은 ID입니다. 영문 또는 숫자 6자리 이상 입력해주세요.',
				value: { accountId: userId },
			});
		} else {
			throw new HttpException('_', 204);
		}
	}

	async signUp(body: JoinRequestDto) {
		// TODO: 아이디를 입력하지 않았을 때
		if (body.userId === null) {
			throw new BadRequestException({
				code: 'requiredId',
				message: '아이디를 입력해주세요.',
			});
		}
		// TODO: 아이디 중복확인 안했을 때
		if (!body.isValidatedId) {
			throw new BadRequestException({
				code: 'nonValidatedId',
				message: '아이디 중복확인을 해 주세요.',
			});
		}
		// TODO: 이름을 입력하지 않았을 때
		if (body.name === null) {
			throw new BadRequestException({
				code: 'requireName',
				message: '이름을 입력해주세요.',
			});
		}
		// TODO: 이름이 형식에 맞지 않을 때
		// TODO: 이메일을 입력하지 않았을 때
		if (body.email === null) {
			throw new BadRequestException({
				code: 'requireEmail',
				message: '이메일을 입력해주세요.',
			});
		}
		// TODO: 이메일 형식이 맞지 않을 때
		// TODO: 비밀번호를 입력하지 않았을 때
		if (body.password === null) {
			throw new BadRequestException({
				code: 'requirePassword',
				message: '비밀번호를 입력해주세요.',
			});
		}
		// TODO: 비밀번호 형식이 맞지 않을 때
		// TODO: 전화번호를 입력하지 않았을 때
		if (body.phone === null) {
			throw new BadRequestException({
				code: 'requirePhone',
				message: '전화번호를 입력해주세요.',
			});
		}
		// TODO: 전화번호 형식이 맞지 않을 때
		// TODO: 문자 인증 안했을 때
		if (body.cert !== 'abcd123') {
			throw new BadRequestException({
				code: 'requireCert',
				message: ' 입력해주세요.',
			});
		} else {
			const salt = await bcrypt.genSalt(10);
			const hashedPassword = await bcrypt.hash(body.password, salt);
			const userInfo = await this.accountRepository.save({
				userId: body.userId,
				name: body.name,
				email: body.email,
				password: hashedPassword,
				phone: body.phone,
				salt: salt,
			});

			console.log('userInfo:', userInfo);
		}
	}
}

// // TODO: 사용자 인증 실패 케이스
// async validateUser(loginUserDto: LoginUserDto): Promise<any> {
// 	const user = await this.accountRepository.findOne({ userId: loginUserDto.userId });
//
// 	// TODO: 없는 유저일 경우 -> 메시지 추후 수정
// 	if (!user) {
// 	throw new ForbiddenException({
// 		statusCode: HttpStatus.UNAUTHORIZED, //401
// 		message: [`존재하지 않는 회원입니다.`],
// 		error: 'Unauthorized',
// 		value: {},
// 	});
// }
// // TODO: 잘못된 사용자 정보를 받았을 때(비밀번호 인증 실패 1회차)
// const isMatch = await bcrypt.compare(loginUserDto.password, user.password);
//
// if (isMatch) {
// 	const { password, ...result } = user;
// 	return result; // password 제외하고 나머지 유저 정보 리턴
// } else {
// 	throw new ForbiddenException({
// 		statusCode: HttpStatus.UNAUTHORIZED,
// 		message: [`비밀번호가 틀렸습니다.`],
// 		error: 'Unauthorized',
// 	});
// }
// }
//
// // TODO: 비밀번호 인증 실패 2회차
//
// // TODO: 비밀번호 인증 실패 3회차
//
// // TODO: 사용자 정보 인증 성공
// async logIn(user: any) {
// 	const payload = {
// 		id: user.id,
// 		accountId: user.accountId /*name: user.name,*/,
// 		email: user.email,
// 		phone: user.phone,
// 	};
// 	return {
// 		// accessToken: this.jwtService.sign(payload),
// 	};
// }
