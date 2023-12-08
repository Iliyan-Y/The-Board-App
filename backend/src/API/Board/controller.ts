import {
  Controller,
  Post,
  HttpCode,
  Body,
  HttpStatus,
  HttpException,
  Get,
  Param,
} from "@nestjs/common";
import {
  CreateService,
  CreateCommand,
  CreateResultStatus,
} from "src/Domain/Board/services/create";
import { CreateResponse } from "./Models/createResponse";
import { InjectMapper, MapPipe } from "@automapper/nestjs";
import { Mapper } from "@automapper/core";
import { BoardModel } from "src/Domain/Board/model";
import { CreateRequest } from "./Models/createRequest";
import { GetBoardService, GetCommand } from "src/Domain/Board/services/get";

@Controller()
export class BoardController {
  constructor(
    private readonly createService: CreateService,
    private readonly getService: GetBoardService,
    @InjectMapper() private readonly mapper: Mapper,
  ) {}

  @Get(":id")
  async findOne(@Param() params: any) {
    const result = await this.getService.get(new GetCommand(params.id));
    return result;
  }

  @Post()
  @HttpCode(201)
  async create(
    @Body() body: CreateRequest, // <- will validate the body first
    @Body(MapPipe(CreateRequest, CreateCommand)) command: CreateCommand,
  ): Promise<CreateResponse> {
    const result = await this.createService.create(command);

    switch (result.status) {
      case CreateResultStatus.Created:
        return this.mapper.map(result.model, BoardModel, CreateResponse);
      case CreateResultStatus.AlreadyExists:
        throw new HttpException("AlreadyExists", HttpStatus.CONFLICT);
      default:
        throw Error(
          `An unexpected issue occurred when creating Board. Result Status was: ${result.status}`,
        );
    }
  }
}
