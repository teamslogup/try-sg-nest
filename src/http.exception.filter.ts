import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from "@nestjs/common";
import { Response } from "express";
import { isArray } from "class-validator";

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>();
    const status = exception.getStatus();
    let data: any;
    data = exception.getResponse();
    if (isArray(data)) {
      return res.status(status).json({ row: data, count: data.length });
    }

    res.status(status).json({ row: data });
  }
}
