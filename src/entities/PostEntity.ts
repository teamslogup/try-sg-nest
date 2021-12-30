import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import { AccountEntity } from './AccountEntity';
import { CoreEntity } from './CoreEntity';

@Entity({ schema: 'try_gs_nest', name: 'posts' })
export class PostEntity extends CoreEntity {
	@IsString()
	@IsNotEmpty()
	@ApiProperty({
		example: 'write title',
		description: 'title',
	})
	@Column('varchar', { name: 'title', length: 150 })
	title: string;

	@IsString()
	@IsNotEmpty()
	@ApiProperty({
		example: 'write content',
		description: 'contents',
	})
	@Column('varchar', { name: 'contents', length: 2000 })
	contents: string;

	@IsString()
	@IsNotEmpty()
	@ApiProperty({
		example: 'images',
		description: 'images',
	})
	@Column('varchar', { name: 'images', length: 200 })
	images: string;

	@IsNotEmpty()
	@Column('int', { name: 'accountId' })
	accountId: number;

	@ManyToOne(type => AccountEntity, account => account.Posts, {
		onUpdate: 'CASCADE',
	})
	@JoinColumn([{ name: 'accountId', referencedColumnName: 'id' }])
	Account: AccountEntity;
}
