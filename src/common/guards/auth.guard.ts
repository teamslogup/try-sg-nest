import {
  Injectable,
  ExecutionContext,
  HttpException,
  Res,
} from "@nestjs/common";
import { errorConstants } from "../constants/error.constants";
import { AuthGuard } from "@nestjs/passport";

@Injectable()
export class JwtAuthGuard extends AuthGuard("jwt") {
  constructor() {
    super();
  }
  getRequest(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest();
    return req;
  }

  handleRequest(err: any, user: any) {
    const a = Res;
    console.log(a);
    if (err || !user) {
      const payload = errorConstants.TokenError;
      payload.value = "token.";
      throw new HttpException(payload, 401) || err;
    }
    return user;
  }
}
