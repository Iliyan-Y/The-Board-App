import { Mapper } from "@automapper/core";
import { InjectMapper, MapPipe } from "@automapper/nestjs";
import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
} from "@nestjs/common";
import { CreateRequest } from "./Models/CreateRequest";
import {
  CreateCommand,
  CreateTaskService,
} from "src/Domain/Task/services/create";

@Controller("task")
export class TaskController {
  constructor(
    @InjectMapper() private readonly mapper: Mapper,
    private readonly createService: CreateTaskService,
  ) {}

  @Post()
  async create(
    @Body() body: CreateRequest,
    @Body(MapPipe(CreateRequest, CreateCommand)) command: CreateCommand,
  ) {
    const result = await this.createService.create(command);
    return result;
  }
}
