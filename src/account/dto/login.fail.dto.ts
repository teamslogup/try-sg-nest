import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

// login fail response dto
export class LoginFailDto {
	@IsString()
	@ApiProperty({
		example: 'wrongPassword',
		description: '로그인 실패 시 에러 알림',
		required: true,
	})
	code: string;

	@IsString()
	@ApiProperty({
		example: '존재하지 않는 회원입니다.',
		description: '로그인 실패 시 에러 메시지',
		required: true,
	})
	message: string;

	@ApiProperty({
		example: {
			accountId: 'jessehj',
		},
		description: '존재하지 않는 회원일 경우 사용자가 입력한 잘못된 정보',
		required: true,
	})
	errorCount?: number;
}
