import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class GetTokenHeaderDto {
	@IsString()
	@IsNotEmpty()
	@ApiProperty({ type: 'string' })
	public token: string;
}
