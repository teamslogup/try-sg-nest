import { HttpException } from "@nestjs/common";
import { diskStorage } from "multer";
import { existsSync, mkdirSync } from "fs";
import e from "express";

export const multerOptions = {
  fileFilter: (request, file, callback) => {
    if (file.mimetype.match(/\/(jpg|jpeg|png)$/)) {
      callback(null, true);
    } else {
      callback(
        new HttpException(
          "This file's format is Unsupported image format.",
          400
        ),
        false
      );
    }
  },

  storage: diskStorage({
    destination: (request, file, callback) => {
      const uploadPath: string = "upload";
      if (!existsSync(uploadPath)) {
        // public 폴더가 존재하지 않을시, 생성합니다.
        mkdirSync(uploadPath);
      }

      callback(null, uploadPath);
    },
    filename(
      req: e.Request,
      file: Express.Multer.File,
      callback: (error: Error | null, filename: string) => void
    ) {
      callback(null, `testfile${file.originalname}`);
    },
  }),
};

export const createImageURL = (file): string => {
  const serverAddress: string = process.env.SERVERADDRESS;
  return `${serverAddress}/upload/${file.filename}`;
};
