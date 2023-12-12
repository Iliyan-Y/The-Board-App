import { AutomapperProfile, InjectMapper } from "@automapper/nestjs";
import { createMap, forMember, mapFrom, type Mapper } from "@automapper/core";
import { Injectable } from "@nestjs/common";

@Injectable()
export class TaskProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper) => {};
  }
}
