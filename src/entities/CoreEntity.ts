import { IsNotEmpty, IsString } from 'class-validator';
import { Column, CreateDateColumn, Index, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Index('id', ['id'], { unique: true })
export class CoreEntity {
	@PrimaryGeneratedColumn({ type: 'int', name: 'id' })
	id: number;

	@CreateDateColumn()
	createdAt: Date;

	@UpdateDateColumn()
	updatedAt: Date;
}
