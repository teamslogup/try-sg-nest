import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Matches, MinLength } from 'class-validator';
import { CoreEntity } from 'src/entities/CoreEntity';

export class SignUpRequestDto extends CoreEntity {
	@IsString()
	@IsNotEmpty()
	@ApiProperty({
		example: 'signupash',
		description: 'accountId',
	})
	@Matches(/^[a-zA-Z0-9]*$/)
	@MinLength(6)
	public accountId: string;

	@IsString()
	@IsNotEmpty()
	@ApiProperty({
		example: 'ash',
		description: 'name',
	})
	@Matches(/^[a-zA-Z0-9]*$/)
	@MinLength(2)
	public name: string;

	@IsString()
	@IsNotEmpty()
	@ApiProperty({
		example: '01013137979',
		description: 'phone',
	})
	public phone: string;

	@IsString()
	@ApiProperty({
		example: 'ash@slogup.com',
		description: 'email',
	})
	public email: string;

	@IsString()
	@IsNotEmpty()
	@ApiProperty({
		example: 'Good@@0531',
		description: 'password',
	})
	public password: string;

	@IsString()
	@IsNotEmpty()
	@ApiProperty({
		example: 'abc123',
		description: '인증코드',
	})
	public cert: string;
}
