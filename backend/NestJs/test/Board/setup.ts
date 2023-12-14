import { ValidationPipe } from "@nestjs/common";
import { BoardController } from "src/API/Board/controller";
import { CreateService } from "src/Domain/Board/services/create";
import { GetBoardService } from "src/Domain/Board/services/get";
import { BoardRepository } from "src/Gateways.DB/Board/repository";
import { BoardColumnRepository } from "src/Gateways.DB/BoardColumn/repository";
import { Board } from "src/Gateways/Board/entity";
import { BoardGateway } from "src/Gateways/Board/gateway";
import { BoardColumn } from "src/Gateways/BoardColumn/entity";
import { BoardColumnGateway } from "src/Gateways/BoardColumn/gateway";
import { Task } from "src/Gateways/Task/entity";
import { BoardProfile } from "src/Modules/Board/mapper.profile";
import { createTestApi } from "test/helpers/api";

const entities = [Board, BoardColumn, Task];
const controllers = [BoardController];
const providers = [
  BoardProfile,
  CreateService,
  { provide: BoardGateway, useClass: BoardRepository },
  { provide: BoardColumnGateway, useClass: BoardColumnRepository },
  GetBoardService,
];

export async function createDefaultTestingModule() {
  const moduleFixture = await createTestApi(entities, controllers, providers)
    .compile()
    .catch((err) => {
      console.error(err);
      throw err;
    });
  const controller = moduleFixture.get<BoardController>(BoardController);
  const app = moduleFixture.createNestApplication();
  app.useGlobalPipes(new ValidationPipe({ enableDebugMessages: true }));
  return { app, controller };
}

export async function mockDbModule(gateway: any, mockGateway: any) {
  const moduleFixture = await createTestApi(entities, controllers, providers)
    .overrideProvider(gateway)
    .useValue(mockGateway)
    .compile()
    .catch((err) => {
      console.error(err);
      throw err;
    });
  const controller = moduleFixture.get<BoardController>(BoardController);
  const app = moduleFixture.createNestApplication();
  app.useGlobalPipes(new ValidationPipe({ enableDebugMessages: true }));
  return { app, controller };
}
