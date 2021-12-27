import { Column, CreateDateColumn, Entity, Index, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Posts } from './PostEntity';

@Entity({ schema: 'try_gs_nest', name: 'accounts' })
@Index('id', ['id'], { unique: true })
export class Accounts {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	userId: string;

	@Column()
	name: string;

	@Column()
	email: string;

	@Column()
	password: string;

	@Column()
	phone: string;

	@Column()
	salt: string;

	@CreateDateColumn()
	createdAt: Date;

	@UpdateDateColumn()
	updatedAt: Date;

	@OneToMany(() => Posts, posts => posts.Accounts)
	Posts: Posts[];
}
