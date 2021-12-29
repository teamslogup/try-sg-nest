import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsBoolean, IsString } from 'class-validator';
import { Accounts } from '../../entities/Accounts';

// signup request dto
export class JoinRequestDto extends PickType(Accounts, [
	'userId',
	'name',
	'email',
	'password',
	'phone',
	'createdAt',
	'updatedAt',
] as const) {
	@ApiProperty({
		example: 'abcd123',
		description: '문자 인증 성공 시 받는 토큰',
		required: true,
	})
	@IsString()
	public cert: string;

	@ApiProperty({
		example: 'Wed, 22 Dec 2021 05:47:09 GMT',
		description: '문자 인증 성공 시 받는 토큰의 만료일',
		required: true,
	})
	@IsString()
	public certExpiredAt: string;

	@ApiProperty({
		example: 'true',
		description: '아이디 중복확인 완료 여부',
		required: true,
	})
	@IsBoolean()
	public isValidatedId: boolean;
}
