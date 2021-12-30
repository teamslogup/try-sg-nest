import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AccountEntity } from 'src/entities/AccountEntity';
import { Repository } from 'typeorm';
import bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
	constructor(@InjectRepository(AccountEntity) private accountRepository: Repository<AccountEntity>) {}

	async validateUser(accountId: string, password: string): Promise<any> {
		const foundUser = await this.accountRepository.findOne({
			where: { accountId: accountId },
		});

		if (!foundUser) {
			throw new Error('존재하지 않는 사용자');
		}

		const result = await bcrypt.compare(password, foundUser.password);
		if (result) {
			const { password, ...userWithoutPassword } = foundUser;
			return userWithoutPassword;
		}
		return null;
	}
}
