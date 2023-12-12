import { AutoMap } from "@automapper/classes";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { BoardColumn } from "../BoardColumn/entity";

@Entity()
export class Task {
  @PrimaryGeneratedColumn("uuid")
  @AutoMap()
  id: string;

  @Column()
  @AutoMap()
  name: string;

  @Column()
  @AutoMap()
  description: string;

  @AutoMap()
  @ManyToOne(() => BoardColumn, (column) => column.tasks)
  column: BoardColumn;
}
