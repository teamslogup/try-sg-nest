import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { AccountEntity } from './AccountEntity';

@Entity({ schema: 'try_gs_nest', name: 'posts' })
export class PostEntity extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

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
		example: 1,
		description: 'accountId',
	})
	@Column('varchar', { name: 'accountId', length: 200 })
	accountId: string;

	@IsString()
	@IsNotEmpty()
	@ApiProperty({
		example: ['image1', 'images2'],
		description: 'images',
	})
	@Column('varchar', { name: 'images', length: 200 })
	images: string[];

	@ManyToOne(() => AccountEntity, account => account.Posts)
	Account: AccountEntity;
}
