import { IsNotEmpty, IsString } from 'class-validator';
import { Column } from 'typeorm';

export class BaseEntity {
	@IsString()
	@IsNotEmpty()
	@Column('varchar', { name: 'createdAt', length: 200 })
	createdAt: string;

	@IsString()
	@IsNotEmpty()
	@Column('varchar', { name: 'updatedAt', length: 200 })
	updatedAt: string;
}
