import { IsNumber, IsString } from 'class-validator';

export class LoginUserDto {
	@IsString()
	public userId: string;

	@IsString()
	public password: string;

	@IsNumber()
	public errorCount: number;
}
