import { AutoMap } from "@automapper/classes";
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { BoardColumn } from "../BoardColumn/entity";

@Entity()
export class Task {
  @PrimaryGeneratedColumn("uuid")
  @AutoMap()
  id: string;

  @Column()
  @AutoMap()
  name: string;

  @Column({ type: "text", nullable: true })
  @AutoMap()
  description: string;

  @Column({ nullable: true })
  @AutoMap()
  url: string;

  @AutoMap()
  @ManyToOne(() => BoardColumn, (column) => column.tasks)
  column: BoardColumn;

  @AutoMap()
  @Column()
  created_at: string;

  @AutoMap()
  @Column()
  updated_at: string;
}
