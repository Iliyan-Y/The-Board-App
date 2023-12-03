import {
  Controller,
  Post,
  HttpCode,
  Body,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import {
  BoardService,
  CreateCommand,
  CreateResultStatus,
} from 'src/Domain/Board/service';
import { CreateResponse } from './Models/createResponse';
import { InjectMapper, MapPipe } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { BoardModel } from 'src/Domain/Board/model';
import { CreateRequest } from './Models/createRequest';

@Controller()
export class BoardController {
  constructor(
    private readonly service: BoardService,
    @InjectMapper() private readonly mapper: Mapper,
  ) {}

  @Post()
  @HttpCode(201)
  async create(
    @Body(MapPipe(CreateRequest, CreateCommand)) command: CreateCommand,
  ): Promise<CreateResponse> {
    // Todo: Add proper validation middleware
    if (!command || !command.name)
      throw Error('All Body parameters are required');

    const result = await this.service.create(command);

    switch (result.status) {
      case CreateResultStatus.Created:
        return this.mapper.map(result.model, BoardModel, CreateResponse);
      case CreateResultStatus.AlreadyExists:
        throw new HttpException('AlreadyExists', HttpStatus.CONFLICT);
      default:
        throw Error(
          `An unexpected issue occurred when creating Board. Result Status was: ${result.status}`,
        );
    }
  }
}
