import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AccountController } from "./account/account.controller";
import { AccountService } from "./account/account.service";
import { AccountModule } from "./account/account.module";
import { AuthModule } from './auth/auth.module';
import ormconfig from "ormconfig";

@Module({
  imports: [TypeOrmModule.forRoot(ormconfig), AccountModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
