import { AutoMap } from "@automapper/classes";
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { BoardColumn } from "../BoardColumn/entitiy";

@Entity()
export class Board {
  @PrimaryGeneratedColumn("uuid")
  @AutoMap()
  id: string;

  @Column()
  @AutoMap()
  name: string;

  @AutoMap(() => [BoardColumn])
  @OneToMany(() => BoardColumn, (column) => column.board)
  columns: BoardColumn[];
}
