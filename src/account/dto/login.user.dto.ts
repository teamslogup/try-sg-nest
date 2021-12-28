import { IsNumber } from 'class-validator';
import { ApiProperty, PickType } from '@nestjs/swagger';
import { Accounts } from '../../entities/Accounts';

// login request dto
export class LoginUserDto extends PickType(Accounts, ['userId', 'password'] as const) {
	@IsNumber()
	@ApiProperty({
		example: 0,
		description: '비밀번호 틀린 횟수',
		required: true,
	})
	public errorCount: number;
}
