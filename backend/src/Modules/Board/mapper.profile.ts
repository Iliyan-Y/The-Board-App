import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { createMap, type Mapper } from '@automapper/core';
import { Injectable } from '@nestjs/common';
import { Board } from 'src/Gateways/Board/entity';
import { BoardModel } from 'src/Domain/Board/model';
import { CreateResponse } from 'src/API/Board/Models/createResponse';

@Injectable()
export class BoardProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper) => {
      createMap(mapper, Board, BoardModel);
      createMap(mapper, BoardModel, CreateResponse);
    };
  }
}
