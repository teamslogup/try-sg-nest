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
		example: 'accountId',
		description: 'accountId',
	})
	@Column('varchar', { name: 'accountId', length: 200 })
	accountId: string;

	@IsString()
	@IsNotEmpty()
	@ApiProperty({
		example: 'ash',
		description: 'name',
	})
	@Column('varchar', { name: 'name', length: 200 })
	name: string;

	@IsEmail()
	@ApiProperty({
		example: 'ash@slogup.com',
		description: 'email',
	})
	@Column('varchar', { name: 'email', length: 200 })
	email: string;

	@IsString()
	@IsNotEmpty()
	@Column('varchar', { name: 'phone', length: 200 })
	phone: string;

	@IsString()
	@IsNotEmpty()
	@Column('varchar', { name: 'password', length: 150 })
	password: string;

	@OneToMany(() => PostEntity, posts => posts.Account)
	Posts: PostEntity[];
}
