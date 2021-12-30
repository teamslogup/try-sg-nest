import { IsNotEmpty, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class loginRequestDto {
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
    example: "password",
    description: "write your password",
  })
  public password: string;
}
