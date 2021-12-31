import { ApiProperty } from "@nestjs/swagger";

export class RequestPostsRequestDto {
  @ApiProperty({
    example: 0,
    description: "Posts Page",
  })
  public page: number;

  @ApiProperty({
    example: 12,
    description: "Page Limit",
  })
  public limit: number;

  @ApiProperty({
    example: "welcome",
    description: "search keyword",
  })
  public keyword: string;
}
