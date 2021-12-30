import { existsSync, mkdirSync } from 'fs';
import { diskStorage } from 'multer';
import HttpError from 'src/exception/HttpError';
import uuidRandom from './uuidRandom';
import dotenv from 'dotenv';

dotenv.config();

export const multerOptions = {
	fileFilter: (request, file, callback) => {
		if (file.mimetype.match(/\/(jpg|jpeg|png)$/)) {
			callback(null, true);
		} else {
			callback(new HttpError(400, '지원하지 않는 이미지 형식입니다.'), false);
		}
	},

	storage: diskStorage({
		destination: (request, file, callback) => {
			const uploadPath: string = 'public';

			if (!existsSync(uploadPath)) {
				mkdirSync(uploadPath);
			}
			callback(null, uploadPath);
		},

		filename: (request, file, callback) => {
			callback(null, uuidRandom(file));
		},
	}),
};

export const createImageURL = (file): string => {
	const serverAddress: string = process.env.SERVER_ADDRESS;
	return `${serverAddress}/${file[0].path}`;
};
