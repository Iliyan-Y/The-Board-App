import { Injectable } from "@nestjs/common";
import { BoardModel } from "../model";
import { BoardGateway } from "src/Gateways/Board/gateway";
import { InjectMapper } from "@automapper/nestjs";
import { Mapper } from "@automapper/core";
import { Board } from "src/Gateways/Board/entity";
import { AutoMap } from "@automapper/classes";
import { BoardColumnGateway } from "src/Gateways/BoardColumn/gateway";
import { BoardColumn } from "src/Gateways/BoardColumn/entitiy";

export class CreateCommand {
  @AutoMap()
  name: string;

  constructor(name: string) {
    this.name = name;
  }
}

export enum CreateResultStatus {
  Created = 1,
  AlreadyExists = "AlreadyExists",
  FailedToCreate = "FailedToCreate",
}

class CreateResult {
  status: CreateResultStatus;
  model: BoardModel;

  constructor(status: CreateResultStatus, model?: BoardModel) {
    (this.model = model), (this.status = status);
  }
}

abstract class CreateBoard {
  abstract create(command: CreateCommand): Promise<CreateResult>;
}

@Injectable()
export class CreateService implements CreateBoard {
  constructor(
    private readonly gateway: BoardGateway,
    private readonly columnsGateway: BoardColumnGateway,
    @InjectMapper() private readonly mapper: Mapper,
  ) {}

  async create(command: CreateCommand): Promise<CreateResult> {
    const model = this.mapper.map(command, CreateCommand, Board);

    if (await this.gateway.exist(model))
      return new CreateResult(CreateResultStatus.AlreadyExists);

    const board = await this.gateway.create(model);
    await this.createInitialColumns(board);
    if (!board) return new CreateResult(CreateResultStatus.FailedToCreate);

    const boardModel = this.mapper.map(board, Board, BoardModel);
    return new CreateResult(CreateResultStatus.Created, boardModel);
  }

  // TODO: refactor this when user can create own columns
  private async createInitialColumns(board: Board) {
    const defaultNames = ["Applied", "Interviewing", "Rejected"];

    for (const name of defaultNames) {
      const col = new BoardColumn();
      col.name = name;
      col.board = board;
      await this.columnsGateway.create(col);
    }
  }
}
