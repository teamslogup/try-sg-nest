import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Accounts } from '../entities/Accounts';

@Index('posts_id_uindex', ['id'], { unique: true })
@Index('posts_accounts__fk', ['accountId'], {})
@Entity('posts', { schema: 'try_sg_nest' })
export class Posts {
	@PrimaryGeneratedColumn({ type: 'int', name: 'id' })
	public id: number;

	@Column('int', { name: 'accountId', nullable: true })
	public accountId: number | null;

	@Column('varchar', { name: 'userId', nullable: true, length: 255 })
	public userId: string | null;

	@Column('varchar', { name: 'title', nullable: true, length: 255 })
	public title: string | null;

	@Column('varchar', { name: 'contents', nullable: true, length: 255 })
	public contents: string | null;

	@Column('varchar', { name: 'images', nullable: true, length: 255 })
	public images: string | null;

	@Column('timestamp', { name: 'createdAt', nullable: true })
	public createdAt: Date | null;

	@Column('timestamp', { name: 'updatedAt', nullable: true })
	public updatedAt: Date | null;

	@ManyToOne(() => Accounts, accounts => accounts.posts, {
		onDelete: 'NO ACTION',
		onUpdate: 'NO ACTION',
	})
	@JoinColumn([{ name: 'accountId', referencedColumnName: 'id' }])
	account: Accounts;
}
