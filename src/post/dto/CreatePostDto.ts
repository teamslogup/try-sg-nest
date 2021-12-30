import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePostDto {
	@IsString()
	@IsNotEmpty()
	@ApiProperty({
		example: 'title',
		description: 'title',
	})
	public title: string;

	@IsString()
	@IsNotEmpty()
	@ApiProperty({
		example: 'content',
		description: 'content',
	})
	public contents: string;

	@IsString()
	@ApiProperty({
		example: 'images',
		description: 'images',
	})
	public images: string;
}
