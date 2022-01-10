import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { UploaderService } from './uploader.service';

@Controller('uploader')
export class UploaderController {
	constructor(private UploaderService: UploaderService) {}

	@Post('/images')
	@UseInterceptors(FilesInterceptor('images'))
	async uploadImages(@UploadedFile() image: Express.Multer.File) {
		await this.UploaderService.uploadImages(image);
	}
}
