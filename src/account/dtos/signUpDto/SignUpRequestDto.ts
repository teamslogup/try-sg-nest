import { ApiProperty } from "@nestjs/swagger";

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
    example: "abcd123",
    description: "phone authorization(only use abcd123)",
  })
  public cert: string;
}
