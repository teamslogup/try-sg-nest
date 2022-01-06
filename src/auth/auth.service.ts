import { Injectable } from "@nestjs/common";
import { AccountService } from "../account/account.service";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
  constructor(
    private accountService: AccountService,
    private jwtService: JwtService
  ) {}

  async validateAccount(payload: { id: number; sub: string }): Promise<any> {
    return await this.accountService.findOneByAccountId(payload.sub);
  }

  async loginAuth(accountId: string, password: string): Promise<Object> {
    const account = await this.accountService.loginAccount(accountId, password);

    const payload = {
      id: account.id,
      sub: account.accountId,
    };
    const jwtToken = this.jwtService.sign(payload);
    return { token: jwtToken, body: account };
  }
}
