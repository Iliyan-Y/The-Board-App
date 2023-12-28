import { AutomapperProfile, InjectMapper } from "@automapper/nestjs";
import { createMap, forMember, mapFrom, type Mapper } from "@automapper/core";
import { Injectable } from "@nestjs/common";
import { CreateCommand } from "src/Domain/Task/services/create";
import { Task } from "src/Gateways/Task/entity";
import { TaskModel } from "src/Domain/Task/mode";
import { CreateResponse } from "src/API/Task/Models/CreateResponse";
import { ListByColumnIdRequest } from "src/API/Task/Models/ListByColumnIdRequest";
import { ListByColIdCommand } from "src/Domain/Task/services/list";
import { ListByColumnIdResult } from "src/API/Task/Models/ListByColumnIdResult";
import { UpdateCommand } from "src/Domain/Task/services/update";
import { GetExtractedPageCommand } from "src/Domain/Task/services/webExtractor";
import { ExtractorPageModel } from "src/Gateways/WebExtractor/model";

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
      createMap(
        mapper,
        UpdateCommand,
        Task,
        forMember(
          (destination) => destination.column.id,
          mapFrom((source) => source.columnId),
        ),
      );
      createMap(
        mapper,
        Task,
        TaskModel,
        forMember(
          (destination) => destination.column,
          mapFrom((source) => source.column),
        ),
      );
      createMap(
        mapper,
        TaskModel,
        CreateResponse,
        forMember(
          (destination) => destination.columnId,
          mapFrom((source) => source.column.id),
        ),
      );
      createMap(mapper, ListByColumnIdRequest, ListByColIdCommand);
      createMap(
        mapper,
        TaskModel,
        ListByColumnIdResult,
        forMember(
          (destination) => destination.columnId,
          mapFrom((source) => source.column.id),
        ),
      );
      createMap(mapper, GetExtractedPageCommand, ExtractorPageModel);
    };
  }
}
