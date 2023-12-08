import { AutoMap } from '@automapper/classes';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Board } from '../Board/entity';

@Entity()
export class BoardColumn {
  @PrimaryGeneratedColumn()
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
}
