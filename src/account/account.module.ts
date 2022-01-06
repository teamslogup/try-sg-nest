import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { JwtModule } from "@nestjs/jwt";
import { ConfigModule } from "@nestjs/config";
import { AccountController, SenderController } from "./account.controller";
import { AccountEntity } from "../common/entities/account.entity";
import { AccountService } from "./account.service";

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forFeature([AccountEntity]),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: "3600s" },
    }),
  ],
  controllers: [AccountController, SenderController],
  providers: [AccountService],
  exports: [AccountService],
})
export class AccountModule {}
