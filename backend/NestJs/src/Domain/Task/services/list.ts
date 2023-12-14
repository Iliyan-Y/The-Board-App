import { AutoMap } from "@automapper/classes";
import { TaskModel } from "../mode";
import { Mapper } from "@automapper/core";
import { InjectMapper } from "@automapper/nestjs";
import { Injectable } from "@nestjs/common";
import { TaskGateway } from "src/Gateways/Task/gateway";
import { Task } from "src/Gateways/Task/entity";

export class ListByColIdCommand {
  @AutoMap()
  columnId: string;
}
export enum ListResultStatus {
  Found = 1,
  NotFound = "NotFound",
}

class ListResult {
  status: ListResultStatus;
  model: TaskModel[];

  constructor(status: ListResultStatus, model?: TaskModel[]) {
    (this.model = model), (this.status = status);
  }
}

abstract class ListTask {
  abstract listColTask(command: ListByColIdCommand): Promise<ListResult>;
}

@Injectable()
export class ListService implements ListTask {
  constructor(
    private readonly gateway: TaskGateway,
    @InjectMapper() private readonly mapper: Mapper,
  ) {}

  async listColTask(command: ListByColIdCommand): Promise<ListResult> {
    const tasks = await this.gateway.listColTask(command.columnId);

    if (!tasks || tasks.length === 0)
      return new ListResult(ListResultStatus.NotFound);

    const taskResult = tasks.map((task) =>
      this.mapper.map(task, Task, TaskModel),
    );

    return new ListResult(ListResultStatus.Found, taskResult);
  }
}
