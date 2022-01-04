import { ApiProperty } from "@nestjs/swagger";
import { CoreEntity } from "src/entities/Core.entity";

export class SignUpRequestDto {
  @ApiProperty({
    example: "accountId",
    description: "accountId",
  })
  public accountId: string;

  @ApiProperty({
    example: "username",
    description: "user's name",
  })
  public name: string;

  @ApiProperty({
    example: "test@gmail.com",
    description: "email",
    nullable: true,
  })
  public email: string;

  @ApiProperty({
    example: "01012345678",
    description: "phone",
  })
  public phone: string;

  @ApiProperty({
    example: "password",
    description: "write your password",
  })
  public password: string;

  @ApiProperty({
    example: "password",
    description: "write your password",
  })
  public cert: string;
}
