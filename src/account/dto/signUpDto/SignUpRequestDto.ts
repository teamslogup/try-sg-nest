import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { CoreEntity } from 'src/entities/CoreEntity';

export class SignUpRequestDto extends CoreEntity {
	@IsString()
	@IsNotEmpty()
	@ApiProperty({
		example: 'accountId',
		description: 'accountId',
	})
	public accountId: string;

	@IsString()
	@IsNotEmpty()
	@ApiProperty({
		example: 'password',
		description: 'password',
	})
	public name: string;

	@IsString()
	@IsNotEmpty()
	@ApiProperty({
		example: 'write your password',
		description: 'email',
	})
	public email: string;

	@IsString()
	@IsNotEmpty()
	@ApiProperty({
		example: 'write your password',
		description: 'phone',
	})
	public phone: string;

	@IsString()
	@IsNotEmpty()
	@ApiProperty({
		example: 'write your password',
		description: 'password',
	})
	public password: string;
}
