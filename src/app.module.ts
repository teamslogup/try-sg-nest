import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AccountModule } from "./account/account.module";
import { AuthModule } from "./auth/auth.module";
import { PostModule } from "./post/post.module";
import ormconfig from "ormconfig";
import { MulterModule } from "@nestjs/platform-express";

@Module({
  imports: [
    TypeOrmModule.forRoot(ormconfig),
    MulterModule.registerAsync({
      useFactory: () => ({
        dest: "./upload",
      }),
    }),
    AccountModule,
    AuthModule,
    PostModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
