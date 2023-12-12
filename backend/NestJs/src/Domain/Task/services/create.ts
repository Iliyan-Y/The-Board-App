import { AutoMap } from "@automapper/classes";
import { TaskModel } from "../mode";
import { Injectable } from "@nestjs/common";
import { TaskGateway } from "src/Gateways/Task/gateway";
import { Mapper } from "@automapper/core";
import { InjectMapper } from "@automapper/nestjs";

export class CreateCommand {
  @AutoMap()
  name: string;

  @AutoMap()
  description: string;

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
    @InjectMapper() private readonly mapper: Mapper,
  ) {}

  create(command: CreateCommand): Promise<CreateResult> {
    throw new Error("Method not implemented.");
  }
}
