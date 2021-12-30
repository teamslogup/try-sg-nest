import { ApiProperty } from '@nestjs/swagger';

export class SignUpResponseDto {
	@ApiProperty({
		example: {},
		description: 'rows',
	})
	public row: object;

	@ApiProperty({
		example: 1,
		description: 'count',
	})
	public count?: number;
}
