import { Controller, Post, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import {
	ApiBody,
	ApiConsumes,
	ApiInternalServerErrorResponse,
	ApiOkResponse,
	ApiOperation,
	ApiResponse,
	ApiTags,
} from '@nestjs/swagger';
import { ErrorResponseDto } from 'src/common/ErrorResponseDto';
import { multerOptions } from 'src/common/lib/multerOptions';
import { BAD_REQUEST } from 'src/common/requestMessage';
import { SERVER_ERROR } from 'src/common/responseMessage';
import { FileUploadDto } from './dto/ImageUploadRequestDto';
import { ImageUploadResponseDto } from './dto/ImageUploadResponseDto';
import { ImageService } from './image.service';
import { ApiCreatedResponse } from '@nestjs/swagger';

@ApiInternalServerErrorResponse({
	description: SERVER_ERROR,
})
@ApiTags('UPLOADS')
@Controller('uploads')
export class ImageController {
	constructor(private imageService: ImageService) {}

	@ApiOperation({ summary: '이미지 업로드' })
	@UseInterceptors(FilesInterceptor('image', null, multerOptions))
	@ApiConsumes('multipart/form-data')
	@ApiBody({
		description: 'image upload',
		type: FileUploadDto,
	})
	@ApiResponse({ description: BAD_REQUEST, type: ErrorResponseDto, status: 400 })
	@ApiCreatedResponse({
		description: 'success',
		type: ImageUploadResponseDto,
	})
	@Post()
	async uploadImages(@UploadedFiles() image: Express.Multer.File) {
		return await this.imageService.uploadImage(image);
	}
}
