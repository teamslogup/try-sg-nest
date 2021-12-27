import { Column, CreateDateColumn, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Accounts } from './AccountEntity';

@Entity({ schema: 'try_gs_nest', name: 'posts' })
@Index('id', ['id'], { unique: true })
export class Posts {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	accountId: number;

	@Column()
	userId: string;

	@Column()
	title: string;

	@Column()
	contents: string;

	@Column()
	images: string;

	@CreateDateColumn()
	createdAt: Date;

	@UpdateDateColumn()
	updatedAt: Date;

	@ManyToOne(() => Accounts, accounts => accounts.Posts)
	@JoinColumn([{ name: 'accountId', referencedColumnName: 'id' }])
	Accounts: Accounts;
}
