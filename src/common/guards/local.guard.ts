import {
  Injectable,
  ExecutionContext,
  HttpException,
  Res,
} from "@nestjs/common";
import { errorConstant } from "../constants/error.constant";
import { AuthGuard } from "@nestjs/passport";

@Injectable()
export class LocalGuard extends AuthGuard("local") {
  constructor(private token: string) {
    super();
  }
  getRequest(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest();
    return req;
  }

  handleRequest(err: any, loginInfo: any) {
    if (err || !loginInfo) {
      throw new HttpException(err.response, err.status) || err;
    }
    return loginInfo;
  }
}
