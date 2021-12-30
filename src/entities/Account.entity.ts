import { Column, Entity, OneToMany } from "typeorm";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

import { PostEntity } from "./Post.entity";
import { CoreEntity } from "./Core.entity";
import AccountStatusTypes from "../common/types/accountStatusType";

@Entity({ schema: "try_gs_nest", name: "accounts" })
export class AccountEntity extends CoreEntity {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: "ash",
    description: "accountId",
  })
  @Column("varchar", { name: "accountId", length: 200, unique: true })
  accountId: string;

  @IsEmail()
  @ApiProperty({
    example: "ash@slogup.com",
    description: "email",
  })
  @Column("varchar", { name: "email", length: 200, nullable: true })
  email: string;

  @IsString()
  @IsNotEmpty()
  @Column("varchar", { name: "password", length: 150, select: false })
  password: string;

  @IsString()
  @IsNotEmpty()
  @Column("varchar", { name: "phone", length: 200 })
  phone: string;

  @Column("enum", {
    name: "status",
    enum: AccountStatusTypes,
    default: AccountStatusTypes.ACTIVE,
    nullable: false,
  })
  status: AccountStatusTypes;

  @OneToMany(() => PostEntity, (posts) => posts.Account)
  Posts: PostEntity[];
}
