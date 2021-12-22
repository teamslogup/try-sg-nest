import { PickType } from '@nestjs/swagger';
import { User } from '../entity/user.entity';

export class CreateUserDto extends PickType(User, ['accountId', 'password']) {}
