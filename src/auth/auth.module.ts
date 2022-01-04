import { forwardRef, Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AccountModule } from "../account/account.module";
import { JwtStrategy } from "../common/strategies/jwt.strategy";
import { JwtModule } from "@nestjs/jwt";
import { LocalStrategy } from "../common/strategies/local.strategy";
import { AccountEntity } from "../entities/Account.entity";

@Module({
  imports: [
    forwardRef(() => AccountModule),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: "3600s" },
    }),
  ],
  providers: [AuthService, JwtStrategy, LocalStrategy],
})
export class AuthModule {}
