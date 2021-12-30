import { ApiProperty } from '@nestjs/swagger';

export class ImageUploadResponseDto {
	@ApiProperty({
		example: 200,
		description: 'status code',
	})
	public code: number;

	@ApiProperty({
		example: 'image upload success',
		description: 'image upload success',
	})
	public msg: string;

	@ApiProperty({
		example: 'imagePath.png',
		description: 'imagePath.png',
	})
	public url: string;
}
