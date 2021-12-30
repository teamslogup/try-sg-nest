import { ApiProperty } from '@nestjs/swagger';

export class FileUploadDto {
	@ApiProperty({ type: 'file' })
	image: any;
}
