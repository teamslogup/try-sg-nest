import { ApiProperty } from "@nestjs/swagger";

export class checkMessageAuthToken {
  @ApiProperty({
    example: "01012345678",
    description: "check user's phone",
  })
  public phone: string;
}
