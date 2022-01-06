import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { AuthService } from "../../auth/auth.service";
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
    return await this.authService.loginAuth(username, password);
  }
}
