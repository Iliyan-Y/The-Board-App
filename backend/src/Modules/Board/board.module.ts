import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BoardController } from "src/API/Board/controller";
import { BoardService } from "src/Domain/Board/service";
import { BoardRepository } from "src/Gateways.DB/Board/repository";
import { Board } from "src/Gateways/Board/entity";
import { BoardGateway } from "src/Gateways/Board/gateway";
import { BoardProfile } from "./mapper.profile";
import { BoardColumn } from "src/Gateways/BoardColumn/entitiy";
import { BoardColumnGateway } from "src/Gateways/BoardColumn/gateway";
import { BoardColumnRepository } from "src/Gateways.DB/BoardColumn/repository";

@Module({
  imports: [TypeOrmModule.forFeature([Board, BoardColumn])],
  controllers: [BoardController],
  providers: [
    BoardService,
    { provide: BoardGateway, useClass: BoardRepository },
    { provide: BoardColumnGateway, useClass: BoardColumnRepository },
    BoardProfile,
  ],
})
export class BoardModule {}
