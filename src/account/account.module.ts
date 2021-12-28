import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Accounts } from '../entities/Accounts';
import { AccountService } from './account.service';
import { AccountController } from './account.controller';

@Module({
	imports: [TypeOrmModule.forFeature([Accounts])],
	providers: [AccountService],
	controllers: [AccountController],
	exports: [],
})
export class AccountModule {}
