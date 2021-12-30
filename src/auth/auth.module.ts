import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AccountModule } from "../account/account.module";
import { JwtStrategy } from "../common/strategies/jwt.strategy";
import { JwtModule } from "@nestjs/jwt";

@Module({
  imports: [
    AccountModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: "3600s" },
    }),
  ],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
