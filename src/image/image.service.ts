import { Injectable } from '@nestjs/common';
import { createImageURL } from 'src/common/lib/multerOptions';

@Injectable()
export class ImageService {
	async uploadImage(image) {
		const imagePath = createImageURL(image);
		return {
			row: {
				code: 201,
				msg: 'image upload success',
				url: imagePath,
			},
		};
	}
}
