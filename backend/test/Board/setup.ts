import { BoardController } from 'src/API/Board/controller';
import { BoardService } from 'src/Domain/Board/service';
import { BoardRepository } from 'src/Gateways.DB/Board/repository';
import { Board } from 'src/Gateways/Board/entity';
import { BoardGateway } from 'src/Gateways/Board/gateway';
import { BoardProfile } from 'src/Modules/Board/mapper.profile';
import { createTestApi } from 'test/helpers/api';

const entities = [Board];
const controllers = [BoardController];
const providers = [
  BoardProfile,
  BoardService,
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
  return { app, controller };
}
