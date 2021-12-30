import { BadRequestException, HttpException, Injectable } from '@nestjs/common';

@Injectable()
export class SenderService {
	sendAuthMessage(body) {
		const phonePattern = /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/;
		if (!body.phone) {
			throw new BadRequestException({
				code: 'requirePhone',
				message: '전화번호를 입력해주세요.',
			});
		}
		if (!phonePattern.test(body.phone)) {
			throw new BadRequestException({
				code: 'invalidPhone',
				message: '유효하지 않은 전화번호 형식입니다.',
				value: { phone: body.phone },
			});
		}

		throw new HttpException('0531', 200);
	}

	sendAuthToken(body, authCode: string) {
		const phonePattern = /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/;
		if (!body.phone) {
			throw new BadRequestException({
				code: 'requirePhone',
				message: '전화번호를 입력해주세요.',
			});
		}
		if (!phonePattern.test(body.phone)) {
			throw new BadRequestException({
				code: 'invalidPhone',
				message: '유효하지 않은 전화번호 형식입니다.',
				value: { phone: body.phone },
			});
		}
		if (authCode !== '0531') {
			throw new BadRequestException({
				code: 'wrongAuthCode',
				message: '잘못된 인증코드입니다.',
				value: { authCode: authCode },
			});
		}

		throw new HttpException(
			{
				cert: 'abcd123',
				certExpiredAt: 'Wed, 22 Jan 2022 05:47:09 GMT',
			},
			200,
		);
	}
}
