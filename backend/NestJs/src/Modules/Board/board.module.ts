import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BoardController } from "src/API/Board/controller";
import { CreateService } from "src/Domain/Board/services/create";
import { BoardRepository } from "src/Gateways.DB/Board/repository";
import { Board } from "src/Gateways/Board/entity";
import { BoardGateway } from "src/Gateways/Board/gateway";
import { BoardProfile } from "./mapper.profile";
import { BoardColumn } from "src/Gateways/BoardColumn/entity";
import { BoardColumnGateway } from "src/Gateways/BoardColumn/gateway";
import { BoardColumnRepository } from "src/Gateways.DB/BoardColumn/repository";
import { GetBoardService } from "src/Domain/Board/services/get";
import { Task } from "src/Gateways/Task/entity";

@Module({
  // TODO: find a way to split the entity or create one module for the db
  // or combine the modules into one for the solution ?
  imports: [TypeOrmModule.forFeature([Board, BoardColumn])],
  controllers: [BoardController],
  providers: [
    CreateService,
    { provide: BoardGateway, useClass: BoardRepository },
    { provide: BoardColumnGateway, useClass: BoardColumnRepository },
    BoardProfile,
    GetBoardService,
  ],
})
export class BoardModule {}
