import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Accounts } from '../entities/Accounts';
import { AccountService } from './account.service';
import { AccountController } from './account.controller';
import { TokenFunction } from '../utils/tokenFunction';

@Module({
	imports: [TypeOrmModule.forFeature([Accounts]), TokenFunction],
	providers: [AccountService, TokenFunction],
	controllers: [AccountController],
	exports: [],
})
export class AccountModule {}
