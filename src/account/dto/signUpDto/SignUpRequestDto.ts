import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";
import { CoreEntity } from "src/entities/Core.entity";

export class SignUpRequestDto extends CoreEntity {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: "accountId",
    description: "accountId",
  })
  public accountId: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: "username",
    description: "user's name",
  })
  public name: string;

  @IsOptional()
  @ApiProperty({
    example: "test@gmail.com",
    description: "email",
  })
  public email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: "01012345678",
    description: "phone",
  })
  public phone: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: "password",
    description: "write your password",
  })
  public password: string;
}
