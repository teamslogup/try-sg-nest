import { ApiProperty } from "@nestjs/swagger";

export class UpdatePostRequestDto {
  @ApiProperty({
    example: "Welcome to slogup!",
    description: "Post Title",
  })
  public title: string;

  @ApiProperty({
    example:
      "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...",
    description: "Post contents",
  })
  public contents: string;

  @ApiProperty({
    example: [".../image1.jpg"],
    description: "images array",
  })
  public images: string;
}
