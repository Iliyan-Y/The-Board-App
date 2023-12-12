import { AutoMap } from "@automapper/classes";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { Board } from "../Board/entity";
import { Task } from "../Task/entitiy";

@Entity()
export class BoardColumn {
  @PrimaryGeneratedColumn("uuid")
  @AutoMap()
  id: string;

  @Column()
  @AutoMap()
  name: string;

  // TODO: if automapper doesn't work
  // check https://stackoverflow.com/questions/73868526/cannot-create-a-mapping-profile-dto-entity
  @AutoMap()
  @ManyToOne(() => Board, (board) => board.columns)
  board: Board;

  @AutoMap(() => [Task])
  @OneToMany(() => Task, (task) => task.column)
  tasks: Task[];
}
