import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountController } from './account/account.controller';
import { AccountService } from './account/account.service';
import config from '../ormconfig';
import { AccountModule } from './account/account.module';
import { AuthModule } from './auth/auth.module';

@Module({
	imports: [TypeOrmModule.forRootAsync(config), AccountModule, AuthModule],
	controllers: [AccountController],
	providers: [AccountService],
})
export class AppModule {}
