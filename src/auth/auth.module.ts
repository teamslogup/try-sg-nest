import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { AccountModule } from '../account/account.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { AccountEntity } from 'src/entities/AccountEntity';
import { TypeOrmModule } from '@nestjs/typeorm';

const jwt = process.env.JWT as string;

@Module({
	imports: [TypeOrmModule.forFeature([AccountEntity]), AccountModule, PassportModule],
	providers: [AuthService, JwtStrategy],
	exports: [AuthService],
})
export class AuthModule {}
