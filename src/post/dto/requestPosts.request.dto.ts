import { ApiProperty } from "@nestjs/swagger";
import { IsOptional } from "class-validator";

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
    nullable: true,
  })
  public keyword: string;
}
