import { Column, Entity, OneToMany } from 'typeorm';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import { PostEntity } from './PostEntity';
import { CoreEntity } from './CoreEntity';

@Entity({ schema: 'try_gs_nest', name: 'accounts' })
export class AccountEntity extends CoreEntity {
	@IsString()
	@IsNotEmpty()
	@ApiProperty({
		example: 'ash',
		description: 'accoundId',
	})
	@Column('varchar', { name: 'accoundId', length: 200 })
	accountId: string;

	@IsEmail()
	@ApiProperty({
		example: 'ash@slogup.com',
		description: 'email',
	})
	@Column('varchar', { name: 'email', length: 200 })
	email: string;

	@IsString()
	@IsNotEmpty()
	@Column('varchar', { name: 'password', length: 150 })
	password: string;

	@IsString()
	@IsNotEmpty()
	@Column('varchar', { name: 'password', length: 200 })
	phone: string;

	@OneToMany(() => PostEntity, posts => posts.Account)
	Posts: PostEntity[];
}
