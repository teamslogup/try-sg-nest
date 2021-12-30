import { Injectable } from "@nestjs/common";
import { AccountService } from "../account/account.service";
import * as bcrypt from "bcrypt";

@Injectable()
export class AuthService {
  constructor(private accountService: AccountService) {}

  async validateAccount(payload: { id: number; sub: string }): Promise<any> {
    return await this.accountService.findOneByAccountId(payload.sub);
  }
}
