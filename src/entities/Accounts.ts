import { Column, Entity, Index, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Posts } from '../entities/Posts';

@Index('accounts_id_uindex', ['id'], { unique: true })
@Entity({ schema: 'try_sg_nest', name: 'accounts' })
export class Accounts {
	@PrimaryGeneratedColumn({ type: 'int', name: 'id' })
	public id: number;

	// @IsString()
	// @IsNotEmpty()
	@Column('varchar', { name: 'userId', nullable: true, length: 255 })
	public userId: string | null;

	// @IsString()
	// @IsNotEmpty()
	@Column('varchar', { name: 'name', nullable: true, length: 255 })
	public name: string | null;

	// @IsEmail()
	// @IsNotEmpty()
	@Column('varchar', { name: 'email', nullable: true, length: 255 })
	public email: string | null;

	// @IsString()
	// @IsNotEmpty()
	@Column('varchar', { name: 'password', nullable: true, length: 255 })
	public password: string | null;

	// @IsString()
	// @IsNotEmpty()
	@Column('varchar', { name: 'phone', nullable: true, length: 255 })
	public phone: string | null;

	@Column('varchar', { name: 'salt', nullable: true, length: 255 })
	public salt: string | null;

	// @IsDate()
	// @IsDateString()
	@Column('timestamp', { name: 'createdAt', nullable: true })
	public createdAt: Date | null;

	@Column('timestamp', { name: 'updatedAt', nullable: true })
	public updatedAt: Date | null;

	@OneToMany(() => Posts, posts => posts.account)
	posts: Posts[];
}
