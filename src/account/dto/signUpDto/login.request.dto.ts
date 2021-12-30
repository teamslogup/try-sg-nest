import { IsNotEmpty, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class loginRequestDto {
  @ApiProperty({
    example: "accountId",
    description: "accountId",
  })
  public accountId: string;

  @ApiProperty({
    example: "password",
    description: "write your password",
  })
  public password: string;
}
