import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class GetPostRequestDto {
	@IsNumber()
	@IsNotEmpty()
	@ApiProperty({
		example: 1,
		description: 'id',
	})
	public id: number;
}

export class GetPostsRequestDto {
	@IsNumber()
	@IsNotEmpty()
	@ApiProperty({
		example: 0,
		description: 'page',
	})
	public page: number;

	@IsNumber()
	@IsNotEmpty()
	@ApiProperty({
		example: 12,
		description: 'limit',
	})
	public limit: number;

	@IsString()
	@ApiProperty({
		example: 'test',
		description: 'keyword',
		required: false,
	})
	@IsOptional()
	public keyword?: string;
}

export class GetPostsResponseDto {
	@ApiProperty({
		example: [],
		description: 'response object',
	})
	public rows: object;
}
