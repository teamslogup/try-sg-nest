import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AccountModule } from '../account/account.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Accounts } from '../entities/Accounts';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';
import dotenv from 'dotenv';

dotenv.config();

@Module({
	imports: [
		AccountModule,
		PassportModule,
		JwtModule.register({
			secret: process.env['JWT_SECRET'],
			// signOptions: { expiresIn: '60s' }, -> 논의 후 수정
		}),
		TypeOrmModule.forFeature([Accounts]),
	],
	providers: [AuthService, LocalStrategy, JwtStrategy],
	controllers: [AuthController],
	exports: [AuthService],
})
export class AuthModule {}
