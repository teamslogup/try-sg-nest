import { Column, Entity, OneToMany } from "typeorm";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

import { PostEntity } from "./post.entity";
import { CoreEntity } from "./core.entity";
import AccountStatusTypes from "../types/account-status-type";

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

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: "볼리",
    description: "username",
  })
  @Column("varchar", { name: "name", length: 50 })
  name: string;

  @IsEmail()
  @ApiProperty({
    example: "ash@slogup.com",
    description: "email",
  })
  @Column("varchar", { name: "email", length: 200, nullable: true })
  email: string;

  @IsString()
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
