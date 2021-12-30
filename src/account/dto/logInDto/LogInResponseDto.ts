import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class LogInResponseDto {
	@ApiProperty({
		example: {},
		description: 'rows',
	})
	public row: object;

	@IsString()
	@ApiProperty({
		example: 'json web token',
		description: 'JWT',
	})
	public token: string;

	@ApiProperty({
		example: 1,
		description: 'count',
	})
	public count?: number;
}
