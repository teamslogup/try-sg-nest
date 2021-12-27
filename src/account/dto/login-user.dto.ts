import { IsNumber, IsString } from 'class-validator';

export class LoginUserDto {
	@IsString()
	userId: string;

	@IsString()
	password: string;

	@IsNumber()
	errorCount: number;
}
