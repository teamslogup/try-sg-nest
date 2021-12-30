import { ApiProperty } from '@nestjs/swagger';

export class ErrorResponseDto {
	@ApiProperty({
		example: 'require error',
		description: 'require error',
	})
	public code: string;

	@ApiProperty({
		example: '입력란을 확인해 주세요',
		description: 'invalid message',
	})
	public msg: string;

	@ApiProperty({
		example: { cert: 'abc123' },
		description: 'value',
	})
	public value?: object;
}
