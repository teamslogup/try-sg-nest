import { PickType } from '@nestjs/swagger';
import { Accounts } from '../../entities/Accounts';

// signup request dto
export class JoinRequestDto extends PickType(Accounts, [
	'userId',
	'name',
	'email',
	'password',
	'phone',
	'createdAt',
	'updatedAt',
] as const) {}
