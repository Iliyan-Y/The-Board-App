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
  Query,
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
import {
  GetExtractedPageCommand,
  GetExtractedPageResultStatus,
  WebExtractorService,
} from "src/Domain/Task/services/webExtractor";

@Controller("task")
export class TaskController {
  constructor(
    @InjectMapper() private readonly mapper: Mapper,
    private readonly createService: CreateTaskService,
    private readonly listService: ListService,
    private readonly updateService: UpdateTaskService,
    private readonly extractor: WebExtractorService,
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
          `An unexpected issue occurred when creating task ${command.name}. Result Status was: ${result.status}`,
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
          `An unexpected issue occurred when getting task for column ${command.columnId}. Result Status was: ${result.status}`,
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
          `An unexpected issue occurred when updating Task with id ${command.id}. Result Status was: ${result.status}`,
        );
    }
  }

  @Get(":taskId/extract")
  async getExtractedPage(
    @Query() { boardId }: { boardId: string },
    @Param() { taskId }: { taskId: string },
  ) {
    const command = new GetExtractedPageCommand(boardId, taskId);
    const result = await this.extractor.getExtractedPage(command);

    switch (result.status) {
      case GetExtractedPageResultStatus.Found:
        return result.value;
      case GetExtractedPageResultStatus.NotFound:
        throw new HttpException(
          `Page for task with id ${taskId} not found`,
          HttpStatus.NOT_FOUND,
        );
      default:
        throw Error(
          `An unexpected issue occurred when getting extracted page for task ${taskId}`,
        );
    }
  }
}
