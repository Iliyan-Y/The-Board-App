import { AutoMap } from "@automapper/classes";
import { TaskModel } from "../mode";
import { Injectable } from "@nestjs/common";
import { TaskGateway } from "src/Gateways/Task/gateway";
import { InjectMapper } from "@automapper/nestjs";
import { Mapper } from "@automapper/core";
import { Task } from "src/Gateways/Task/entity";

export class UpdateCommand {
  @AutoMap()
  id: string;

  @AutoMap()
  name: string;

  @AutoMap()
  description: string;

  @AutoMap()
  columnId: string;

  constructor(id: string, name: string, description: string, columnId: string) {
    this.id = id;
    this.name = name;
    this.columnId = columnId;
    this.description = description;
  }
}

export enum UpdateResultStatus {
  Updated = 1,
  FailedToUpdate = "FailedToUpdate",
}

class UpdateResult {
  status: UpdateResultStatus;
  model: TaskModel;

  constructor(status: UpdateResultStatus, model?: TaskModel) {
    (this.model = model), (this.status = status);
  }
}

abstract class UpdateTask {
  abstract update(command: UpdateCommand): Promise<UpdateResult>;
}
@Injectable()
export class UpdateTaskService implements UpdateTask {
  constructor(
    private readonly gateway: TaskGateway,
    @InjectMapper() private readonly mapper: Mapper,
  ) {}

  async update(command: UpdateCommand): Promise<UpdateResult> {
    const model = this.mapper.map(command, UpdateCommand, Task);
    const task = await this.gateway.update(model);
    const taskModel = this.mapper.map(task, Task, TaskModel);

    if (!taskModel) return new UpdateResult(UpdateResultStatus.FailedToUpdate);

    return new UpdateResult(UpdateResultStatus.Updated, taskModel);
  }
}
