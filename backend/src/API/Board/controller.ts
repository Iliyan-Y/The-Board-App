import { Controller, Post, HttpCode } from '@nestjs/common';
import { BoardService, CreateCommand } from 'src/Domain/Board/service';
import { CreateResponse } from './Models/createResponse';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { BoardModel } from 'src/Domain/Board/model';

@Controller()
export class BoardController {
  constructor(
    private readonly service: BoardService,
    @InjectMapper() private readonly mapper: Mapper,
  ) {}

  @Post()
  @HttpCode(201)
  async create(): Promise<CreateResponse> {
    const result = await this.service.create(new CreateCommand('bobo'));
    const response = this.mapper.map(result.model, BoardModel, CreateResponse);
    return response;
  }
}
