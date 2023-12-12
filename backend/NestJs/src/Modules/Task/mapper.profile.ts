import { AutomapperProfile, InjectMapper } from "@automapper/nestjs";
import { createMap, forMember, mapFrom, type Mapper } from "@automapper/core";
import { Injectable } from "@nestjs/common";
import { CreateCommand } from "src/Domain/Task/services/create";
import { Task } from "src/Gateways/Task/entity";
import { CreateRequest } from "src/API/Task/Models/CreateRequest";
import { TaskModel } from "src/Domain/Task/mode";

@Injectable()
export class TaskProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper) => {
      createMap(
        mapper,
        CreateCommand,
        Task,
        forMember(
          (destination) => destination.column.id,
          mapFrom((source) => source.columnId),
        ),
      );
      createMap(mapper, Task, TaskModel);
    };
  }
}
