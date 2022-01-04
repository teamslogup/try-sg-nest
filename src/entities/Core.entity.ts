import {
  CreateDateColumn,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Index("id", ["id"], { unique: true })
export class CoreEntity {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
