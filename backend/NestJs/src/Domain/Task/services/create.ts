import { AutoMap } from "@automapper/classes";
import { TaskModel } from "../mode";
import { Injectable } from "@nestjs/common";
import { TaskGateway } from "src/Gateways/Task/gateway";
import { Mapper } from "@automapper/core";
import { InjectMapper } from "@automapper/nestjs";
import { Task } from "src/Gateways/Task/entity";
import { WebExtractorGateway } from "src/Gateways/WebExtractor/gateway";
import { ExtractorPageModel } from "src/Gateways/WebExtractor/model";

export class CreateCommand {
  @AutoMap()
  name: string;

  @AutoMap()
  description: string;

  @AutoMap()
  url: string;

  @AutoMap()
  columnId: string;

  constructor(name: string, description: string, columnId: string) {
    this.name = name;
    this.columnId = columnId;
    this.description = description;
  }
}

export enum CreateResultStatus {
  Created = 1,
  FailedToCreate = "FailedToCreate",
}

class CreateResult {
  status: CreateResultStatus;
  model: TaskModel;

  constructor(status: CreateResultStatus, model?: TaskModel) {
    (this.model = model), (this.status = status);
  }
}

abstract class CreateTask {
  abstract create(command: CreateCommand): Promise<CreateResult>;
}

@Injectable()
export class CreateTaskService implements CreateTask {
  constructor(
    private readonly gateway: TaskGateway,
    private readonly webExtractor: WebExtractorGateway,
    @InjectMapper() private readonly mapper: Mapper,
  ) {}

  async create(command: CreateCommand): Promise<CreateResult> {
    const model = this.mapper.map(command, CreateCommand, Task);
    const task = await this.gateway.create(model);
    if (!task) return new CreateResult(CreateResultStatus.FailedToCreate);
    console.log("Task created: ", task);
    if (task.url) {
      this.webExtractor.extract(
        new ExtractorPageModel(task.id, task.column.board.id, task.url),
      );
    }

    const taskModel = this.mapper.map(task, Task, TaskModel);
    return new CreateResult(CreateResultStatus.Created, taskModel);
  }
}
