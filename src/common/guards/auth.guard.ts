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
  constructor(private token: string) {
    super();
  }
  getRequest(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest();
    this.token = req.headers["x-auth-token"];
    return req;
  }

  handleRequest(err: any, user: any) {
    if (err || !user) {
      const payload = errorConstants.TokenError;
      payload.value = this.token;
      throw new HttpException(payload, 401) || err;
    }
    return user;
  }
}
