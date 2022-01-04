import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { AuthService } from "../../auth/auth.service";
import { loginRequestDto } from "../../account/dto/signUpDto/login.request.dto";
import { Strategy } from "passport-local";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      usernameField: "accountId",
      passwordField: "password",
    });
  }

  async validate(username: string, password: string): Promise<Object> {
    const loginInfo = await this.authService.loginAuth(username, password);
    return loginInfo;
  }
}
