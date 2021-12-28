import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import dotenv from 'dotenv';
import { join } from 'path';

dotenv.config();
const config: TypeOrmModuleOptions = {
	type: 'mysql',
	host: process.env['DB_HOST'],
	port: 3306,
	username: process.env['DB_USERNAME'],
	password: process.env['DB_PASSWORD'],
	database: process.env['DB_DATABASE'],
	entities: [join(__dirname, '**', '*.entity.{ts,js}')],
	migrations: [__dirname + '/src/migrations/*.ts'],
	cli: { migrationsDir: 'src/migrations' },
	autoLoadEntities: true,
	charset: 'utf8mb4',
	synchronize: false, // 한번 만들고 나서는 false 로 해주는것이 좋다.
	logging: true,
	keepConnectionAlive: true,
};

export = config;
