import { Column, Entity, Index, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Posts } from './Posts';

@Index('accounts_id_uindex', ['id'], { unique: true })
@Entity('accounts', { schema: 'try_sg_nest' })
export class Accounts {
	@PrimaryGeneratedColumn({ type: 'int', name: 'id' })
	id: number;

	@Column('varchar', { name: 'userId', nullable: true, length: 255 })
	userId: string | null;

	@Column('varchar', { name: 'name', nullable: true, length: 255 })
	name: string | null;

	@Column('varchar', { name: 'email', nullable: true, length: 255 })
	email: string | null;

	@Column('varchar', { name: 'password', nullable: true, length: 255 })
	password: string | null;

	@Column('varchar', { name: 'phone', nullable: true, length: 255 })
	phone: string | null;

	@Column('varchar', { name: 'salt', nullable: true, length: 255 })
	salt: string | null;

	@Column('timestamp', { name: 'createdAt', nullable: true })
	createdAt: Date | null;

	@Column('timestamp', { name: 'updatedAt', nullable: true })
	updatedAt: Date | null;

	@OneToMany(() => Posts, posts => posts.account)
	posts: Posts[];
}
