import { OmitType } from '@nestjs/swagger';
import { Accounts } from '../../entities/Accounts';

// login success response dto
export class UserDto extends OmitType(Accounts, ['password', 'salt'] as const) {}
