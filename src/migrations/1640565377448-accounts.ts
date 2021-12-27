import { MigrationInterface, QueryRunner } from 'typeorm';

export class accounts1640565377448 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		// await queryRunner.createTable(
		// 	new Table({
		// 		name: 'accounts',
		// 		columns: [
		// 			{
		// 				name: 'id',
		// 				type: 'int',
		// 				isPrimary: true,
		// 				isGenerated: true,
		// 				isUnique: true,
		// 			},
		// 			{
		// 				name: 'userId',
		// 				type: 'varchar',
		// 			},
		// 			{
		// 				name: 'name',
		// 				type: 'varchar',
		// 			},
		// 			{
		// 				name: 'email',
		// 				type: 'varchar',
		// 			},
		// 			{
		// 				name: 'password',
		// 				type: 'varchar',
		// 			},
		// 			{
		// 				name: 'phone',
		// 				type: 'varchar',
		// 			},
		// 			{
		// 				name: 'salt',
		// 				type: 'varchar',
		// 			},
		// 			{
		// 				name: 'createdAt',
		// 				type: 'timestamp',
		// 			},
		// 			{
		// 				name: 'updatedAt',
		// 				type: 'timestamp',
		// 			},
		// 		],
		// 	}),
		// );
		//
		// await queryRunner.createTable(
		// 	new Table({
		// 		name: 'posts',
		// 		columns: [
		// 			{
		// 				name: 'id',
		// 				type: 'int',
		// 				isPrimary: true,
		// 				isGenerated: true,
		// 				isUnique: true,
		// 			},
		// 			{
		// 				name: 'accountId',
		// 				type: 'int',
		// 			},
		// 			{
		// 				name: 'title',
		// 				type: 'varchar',
		// 			},
		// 			{
		// 				name: 'contents',
		// 				type: 'varchar',
		// 			},
		// 			{
		// 				name: 'images',
		// 				type: 'varchar',
		// 			},
		// 			{
		// 				name: 'createdAt',
		// 				type: 'timestamp',
		// 			},
		// 			{
		// 				name: 'updatedAt',
		// 				type: 'timestamp',
		// 			},
		// 		],
		// 	}),
		// );
		//
		// await queryRunner.createForeignKey(
		// 	'posts',
		// 	new TableForeignKey({
		// 		columnNames: ['accountId'],
		// 		referencedColumnNames: ['id'],
		// 		referencedTableName: 'accounts',
		// 		onDelete: 'CASCADE',
		// 	}),
		// );
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		// const accountsTable = await queryRunner.getTable('accounts');
		// const postsTable = await queryRunner.getTable('posts');
		// const foreignKey = postsTable.foreignKeys.find(fk => fk.columnNames.indexOf('accountId') !== -1);
		// await queryRunner.dropForeignKey('posts', foreignKey);
		// await queryRunner.dropColumn('posts', 'accountId');
		// await queryRunner.dropTable('accounts');
		// await queryRunner.dropTable('posts');
	}
}
