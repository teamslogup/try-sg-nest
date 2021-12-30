import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountEntity } from 'src/entities/AccountEntity';
import { PostEntity } from 'src/entities/PostEntity';
import { AccountController } from './account.controller';
import { AccountService } from './account.service';
import dotenv from 'dotenv';
dotenv.config();

const jwt = process.env.JWT as string;

@Module({
	imports: [
		TypeOrmModule.forFeature([AccountEntity, PostEntity]),
		JwtModule.register({
			secret: jwt,
			signOptions: { expiresIn: 3600 },
		}),
	],
	providers: [AccountService],
	exports: [AccountService],
	controllers: [AccountController],
})
export class AccountModule {}
