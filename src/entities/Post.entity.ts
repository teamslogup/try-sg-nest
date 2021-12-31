import { Column, Entity, ManyToOne } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";

import { AccountEntity } from "./Account.entity";
import { CoreEntity } from "./Core.entity";

@Entity({ schema: "try_gs_nest", name: "posts" })
export class PostEntity extends CoreEntity {
  @ApiProperty({
    example: "write title",
    description: "title",
  })
  @Column("varchar", { name: "title", length: 150 })
  title: string;

  @ApiProperty({
    example: "write content",
    description: "contents",
  })
  @Column("varchar", { name: "contents", length: 2000 })
  contents: string;

  @ApiProperty({
    example: ["image1", "images2"],
    description: "images",
  })
  @Column("varchar", { name: "images", length: 200 })
  images: string[];

  @Column("varchar", { name: "author" })
  author: string;

  @Column("int", { nullable: true })
  accountId: number;

  @ManyToOne(() => AccountEntity, (accounts) => accounts.Posts, {
    onDelete: "SET NULL",
    onUpdate: "CASCADE",
  })
  Account: AccountEntity;
}
