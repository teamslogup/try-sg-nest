import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common';
import { Response } from 'express';

export interface Row {
	error?: string;
	statusCode?: 400;
	message: string[];
	code: string;
	value?: object;
}

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
	catch(exception: HttpException, host: ArgumentsHost) {
		const ctx = host.switchToHttp();
		const response = ctx.getResponse<Response>();
		const status = exception.getStatus();
		const err = exception.getResponse() as string | Row;

		// class-validator가 준 에러
		if (typeof err !== 'string' && err.error === 'Bad Request') {
			const json: Row = {
				code: err.code,
				message: err.message,
				value: err.value,
			};
			console.log(err.code, err.message, err.value);
			return response.status(status).json({
				row: json,
			});
		}
		console.log(status, err);

		// 서버 자체 발생 에러
		response.status(status).json({ row: err });
	}
}
