import { ValidationPipe } from "@nestjs/common";
import { BoardController } from "src/API/Board/controller";
import { CreateService } from "src/Domain/Board/services/create";
import { BoardRepository } from "src/Gateways.DB/Board/repository";
import { Board } from "src/Gateways/Board/entity";
import { BoardGateway } from "src/Gateways/Board/gateway";
import { BoardProfile } from "src/Modules/Board/mapper.profile";
import { createTestApi } from "test/helpers/api";

const entities = [Board];
const controllers = [BoardController];
const providers = [
  BoardProfile,
  CreateService,
  { provide: BoardGateway, useClass: BoardRepository },
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

export async function mockDbModule(mockService: any) {
  const moduleFixture = await createTestApi(entities, controllers, providers)
    .overrideProvider(BoardGateway)
    .useValue(mockService)
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
