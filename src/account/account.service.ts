import {
	BadRequestException,
	ConflictException,
	ForbiddenException,
	HttpException,
	Injectable,
	UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Accounts } from '../entities/Accounts';
import { Repository } from 'typeorm';
import { JoinRequestDto } from './dto/join.request.dto';
import bcrypt from 'bcrypt';
import { LoginUserDto } from './dto/login.user.dto';
import { TokenFunction } from '../utils/tokenFunction';

@Injectable()
export class AccountService {
	constructor(
		@InjectRepository(Accounts)
		private accountRepository: Repository<Accounts>, // private jwtService: JwtService, //
		private tokenFunction: TokenFunction,
	) {}

	async checkDuplicationId(userId: string) {
		const searchId = await this.accountRepository.findOne({ where: { userId: userId } });
		const idPattern = /^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]{6,}$/;

		if (searchId) {
			throw new ConflictException({
				code: 'duplicatedId',
				message: '중복된 아이디입니다.',
			});
		}
		// 형식에 맞지 않는 아이디일 때
		if (!idPattern.test(userId)) {
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
		const pwPattern = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,}$/;
		const namePattern = /^[가-힣]{2,}|[a-zA-Z]{2,}$/;
		const emailPattern = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
		const phonePattern = /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/;
		// TODO: 아이디를 입력하지 않았을 때
		if (!body.userId) {
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
		if (!body.name) {
			throw new BadRequestException({
				code: 'requireName',
				message: '이름을 입력해주세요.',
			});
		}
		// TODO: 이름이 형식에 맞지 않을 때
		if (!namePattern.test(body.name)) {
			throw new BadRequestException({
				code: 'invalidName',
				message: '유효하지 않은 이름입니다. 한글 또는 영문 2자리 이상 입력해주세요.',
				value: { name: body.name },
			});
		}
		// TODO: 이메일을 입력하지 않았을 때
		if (!body.email) {
			throw new BadRequestException({
				code: 'requireEmail',
				message: '이메일을 입력해주세요.',
			});
		}
		// TODO: 이메일 형식이 맞지 않을 때
		if (!emailPattern.test(body.email)) {
			throw new BadRequestException({
				code: 'invalidEmail',
				message: '유효하지 않은 이메일 형식입니다.',
				value: { email: body.email },
			});
		}
		// TODO: 비밀번호를 입력하지 않았을 때
		if (!body.password) {
			throw new BadRequestException({
				code: 'requirePassword',
				message: '비밀번호를 입력해주세요.',
			});
		}
		// TODO: 비밀번호 형식이 맞지 않을 때
		if (!pwPattern.test(body.password)) {
			throw new BadRequestException({
				code: 'invalidPassword',
				message: '유효하지 않은 비밀번호 형식입니다. 영문, 숫자, 특수문자가 조합된 6자리 이상 입력해주세요.',
				value: { password: body.password },
			});
		}
		// TODO: 전화번호를 입력하지 않았을 때
		if (!body.phone) {
			throw new BadRequestException({
				code: 'requirePhone',
				message: '전화번호를 입력해주세요.',
			});
		}
		// TODO: 전화번호 형식이 맞지 않을 때
		if (!phonePattern.test(body.phone)) {
			throw new BadRequestException({
				code: 'invalidPhone',
				message: '유효하지 않은 전화번호 형식입니다.',
				value: { phone: body.phone },
			});
		}
		// TODO: 문자 인증 안했을 때
		if (body.cert !== 'abcd123') {
			throw new BadRequestException({
				code: 'requireCert',
				message: ' 입력해주세요.',
			});
		}

		const salt = await bcrypt.genSalt(10);
		const filteredPhoneNum = body.phone.replace(/-/g, '');
		const hashedPassword = await bcrypt.hash(body.password, salt);
		const userInfo = await this.accountRepository.save({
			userId: body.userId,
			name: body.name,
			email: body.email,
			password: hashedPassword,
			phone: filteredPhoneNum,
			salt: salt,
			createdAt: new Date(),
			updatedAt: new Date(),
		});

		console.log('userInfo:', userInfo);
		throw new HttpException(userInfo, 201);
	}

	async logIn(user: LoginUserDto, res) {
		const userInfo = await this.accountRepository.findOne({ where: { userId: user.userId } });

		// TODO: 없는 유저일 경우
		if (!userInfo) {
			throw new ForbiddenException({
				code: '',
				message: '존재하지 않는 회원입니다.',
				value: { accountId: user.userId },
			});
		}

		// TODO: 잘못된 사용자 정보를 받았을 때(비밀번호 인증 실패)
		const isMatch = await bcrypt.compare(user.password, userInfo.password);
		const returnPwError = (errorCount: number): object => {
			const addMessage: string = errorCount < 3 ? ', 연속 3회 입력 오류시 로그인이 제한됩니다' : '';
			return {
				code: 'wrongPassword',
				message: `비밀번호를 ${errorCount + 1}회 틀렸습니다${addMessage}.`,
				errorCount: errorCount + 1,
			};
		};

		if (!isMatch && user.errorCount < 3) {
			const json = await returnPwError(user.errorCount);
			throw new ForbiddenException(json);
		}
		if (user.errorCount >= 3) {
			throw new ForbiddenException({
				code: 'lockedSignIn',
				message: '비밀번호 3회 입력 오류로 인해 잠긴 계정입니다. 본인인증 후 재시도해주세요.',
			});
		}
		delete userInfo.password;
		delete userInfo.salt;

		const payload = {
			id: userInfo.id,
			userId: userInfo.userId,
			name: userInfo.name,
			email: userInfo.email,
			phone: userInfo.phone,
		};
		const accessToken = await this.tokenFunction.generateAccessToken(payload);

		return res.set({ 'x-auth-token': accessToken }).status(200).json({ row: userInfo });
	}

	async logOut(req) {
		const accessToken = req.headers['x-auth-token'];
		if (!accessToken) {
			throw new UnauthorizedException({
				code: 'invalidAuthToken',
				message: '사용자 인증 토큰이 유효하지 않습니다. 다시 로그인해주세요.',
				value: { 'x-auth-token': null },
			});
		}

		throw new HttpException({}, 204);
	}

	async getProfile(req) {
		const data = await this.tokenFunction.isAuthorized(req);
		if (!data.userInfo) {
			throw new UnauthorizedException({
				code: 'invalidAuthToken',
				message: '사용자 인증 토큰이 유효하지 않습니다. 다시 로그인해주세요.',
				value: { 'x-auth-token': data.accessToken },
			});
		}
		throw new HttpException(data.userInfo, 200);
	}
}
