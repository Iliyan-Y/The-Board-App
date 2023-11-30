import { Injectable } from '@nestjs/common';
import { BoardModel } from './model';
import { BoardGateway } from 'src/Gateways/Board/gateway';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { Board } from 'src/Gateways/Board/entity';
import { AutoMap } from '@automapper/classes';

export class CreateCommand {
  @AutoMap()
  name: string;

  constructor(name: string) {
    this.name = name;
  }
}

export enum CreateResultStatus {
  Created = 1,
  AlreadyExists = 'AlreadyExists',
  FailedToCreate = 'FailedToCreate',
}

class CreateResult {
  status: CreateResultStatus;
  model: BoardModel;

  constructor(status: CreateResultStatus, model?: BoardModel) {
    (this.model = model), (this.status = status);
  }
}

abstract class BoardServiceAbstract {
  abstract create(command: CreateCommand): Promise<CreateResult>;
}

@Injectable()
export class BoardService implements BoardServiceAbstract {
  constructor(
    private readonly gateway: BoardGateway,
    @InjectMapper() private readonly mapper: Mapper,
  ) {}

  async create(command: CreateCommand): Promise<CreateResult> {
    const model = this.mapper.map(command, CreateCommand, Board);

    if (await this.gateway.exist(model))
      return new CreateResult(CreateResultStatus.AlreadyExists);

    const board = await this.gateway.create(model);
    if (!board) return new CreateResult(CreateResultStatus.FailedToCreate);

    const boardModel = this.mapper.map(board, Board, BoardModel);
    return new CreateResult(CreateResultStatus.Created, boardModel);
  }
}
