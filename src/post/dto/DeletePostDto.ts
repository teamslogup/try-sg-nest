import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class DeletePostResponseDto {
	@IsNumber()
	@IsNotEmpty()
	@ApiProperty({
		example: 'id',
		description: 'id',
	})
	public id: number;

	@IsNumber()
	@IsNotEmpty()
	@ApiProperty({
		example: 'msg',
		description: 'msg',
	})
	public msg?: string;

	@IsNumber()
	@IsNotEmpty()
	@ApiProperty({
		example: 1,
		description: 'number',
	})
	public value?: number;
}
