import { ExecutionContext, createParamDecorator } from "@nestjs/common";

export const CurrentToken = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const req = context.switchToHttp().getRequest();
    return req.headers["x-auth-token"];
  }
);
