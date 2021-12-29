import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common';
import { Response } from 'express';

export interface Row {
	code: string;
	message: string;
	value?: object;
}

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
	catch(exception: HttpException, host: ArgumentsHost) {
		const ctx = host.switchToHttp();
		const response = ctx.getResponse<Response>();
		const status = exception.getStatus();
		const err = exception.getResponse() as string | Row;

		if (typeof err !== 'string') {
			const json: Row = {
				code: err.code,
				message: err.message,
				value: err.value,
			};
			return response.status(status).json({
				row: json,
			});
		}

		console.log(status, err);
		response.status(status).json({ message: err });
	}
}
