import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { CoreEntity } from 'src/entities/CoreEntity';

export class LogInRequestDto extends CoreEntity {
	@IsString()
	@IsNotEmpty()
	@ApiProperty({
		example: 'signupash',
		description: 'accountId',
	})
	public accountId: string;

	@IsString()
	@IsNotEmpty()
	@ApiProperty({
		example: 'Good@@0531',
		description: 'password',
	})
	public password: string;
}
