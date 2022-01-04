import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Accounts } from '../entities/Accounts';

@Index('posts_id_uindex', ['id'], { unique: true })
@Index('posts_accounts__fk', ['accountId'], {})
@Entity('posts', { schema: 'try_sg_nest' })
export class Posts {
	@PrimaryGeneratedColumn({ type: 'int', name: 'id' })
	public id: number;

	@Column('int', { name: 'accountId', nullable: false })
	public accountId: number;

	@Column('varchar', { name: 'userId', nullable: false, length: 255 })
	public userId: string;

	@Column('varchar', { name: 'title', nullable: false, length: 255 })
	public title: string;

	@Column('varchar', { name: 'contents', nullable: false, length: 255 })
	public contents: string;

	@Column('varchar', { name: 'images', nullable: false, length: 255 })
	public images: string;

	@Column('timestamp', { name: 'createdAt', nullable: false })
	public createdAt: Date;

	@Column('timestamp', { name: 'updatedAt', nullable: false })
	public updatedAt: Date;

	@ManyToOne(() => Accounts, accounts => accounts.posts, {
		onDelete: 'NO ACTION',
		onUpdate: 'NO ACTION',
	})
	@JoinColumn([{ name: 'accountId', referencedColumnName: 'id' }])
	account: Accounts;
}
