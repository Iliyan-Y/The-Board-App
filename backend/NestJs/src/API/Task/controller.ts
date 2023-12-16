import { Mapper } from "@automapper/core";
import { InjectMapper, MapPipe } from "@automapper/nestjs";
import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
} from "@nestjs/common";
import { CreateRequest } from "./Models/CreateRequest";
import {
  CreateCommand,
  CreateResultStatus,
  CreateTaskService,
} from "src/Domain/Task/services/create";
import { TaskModel } from "src/Domain/Task/mode";
import { CreateResponse } from "./Models/CreateResponse";
import { ListByColumnIdRequest } from "./Models/ListByColumnIdRequest";
import {
  ListByColIdCommand,
  ListResultStatus,
  ListService,
} from "src/Domain/Task/services/list";
import { ListByColumnIdResult } from "./Models/ListByColumnIdResult";
import { UpdateRequest } from "./Models/UpdateModel";
import {
  UpdateCommand,
  UpdateResultStatus,
  UpdateTaskService,
} from "src/Domain/Task/services/update";

@Controller("task")
export class TaskController {
  constructor(
    @InjectMapper() private readonly mapper: Mapper,
    private readonly createService: CreateTaskService,
    private readonly listService: ListService,
    private readonly updateService: UpdateTaskService,
  ) {}

  @Post()
  async create(
    @Body() body: CreateRequest,
    @Body(MapPipe(CreateRequest, CreateCommand)) command: CreateCommand,
  ) {
    const result = await this.createService.create(command);

    switch (result.status) {
      case CreateResultStatus.Created:
        return this.mapper.map(result.model, TaskModel, CreateResponse);
      case CreateResultStatus.FailedToCreate:
        throw new HttpException(
          `Task with name ${command.name} failed to create`,
          HttpStatus.BAD_REQUEST,
        );
      default:
        throw Error(
          `An unexpected issue occurred when creating Board. Result Status was: ${result.status}`,
        );
    }
  }

  @Get(":columnId")
  async getByColumnID(
    @Param(MapPipe(ListByColumnIdRequest, ListByColIdCommand))
    command: ListByColIdCommand,
  ) {
    console.log("Fetching data for ", command.columnId);
    const result = await this.listService.listColTask(command);

    switch (result.status) {
      case ListResultStatus.Found:
        return result.model.map((task) =>
          this.mapper.map(task, TaskModel, ListByColumnIdResult),
        );
      case ListResultStatus.NotFound:
        return [];
      default:
        throw Error(
          `An unexpected issue occurred when creating Board. Result Status was: ${result.status}`,
        );
    }
  }

  @Put()
  async updateTask(
    @Body() body: UpdateRequest,
    @Body(MapPipe(UpdateRequest, UpdateCommand)) command: UpdateCommand,
  ) {
    console.log("Updating task for ", command.id);
    const result = await this.updateService.update(command);
    switch (result.status) {
      case UpdateResultStatus.Updated:
        return this.mapper.map(result.model, TaskModel, CreateResponse);
      case UpdateResultStatus.FailedToUpdate:
        throw new HttpException(
          `Task with name ${command.name} failed to update`,
          HttpStatus.BAD_REQUEST,
        );
      default:
        throw Error(
          `An unexpected issue occurred when creating Board. Result Status was: ${result.status}`,
        );
    }
  }
}
