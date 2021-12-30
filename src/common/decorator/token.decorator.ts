import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const Token = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
	const response = ctx.switchToHttp().getResponse();
	console.log('response :', response);
	return response.locals.jwt;
});
