import { Board } from '../../src/Gateways/Board/entity';
import * as httpMocks from 'node-mocks-http';
import { CreateCommand } from '../../src/Domain/Board/service';
import * as request from 'supertest';
import { CreateResponse } from 'src/API/Board/Models/createResponse';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { createDefaultTestingModule } from './setup';

describe('board controller', () => {
  const mockRequest = httpMocks.createRequest();
  mockRequest.body = {
    boardName: 'Test-123',
  };
  // const entity: Board = {
  //   name: 'Test',
  // };

  // const mockService = {
  //   create: jest.fn().mockImplementation((model: Board) => {
  //     return {
  //       id: 1,
  //       ...model,
  //     };
  //   }),
  // };

  // create fake module
  // beforeEach(async () => {
  //   const moduleFixture: TestingModule = await Test.createTestingModule({
  //     imports: [
  //       AutomapperModule.forRoot({
  //         strategyInitializer: classes(),
  //       }),
  //       ...TypeOrmTestingModule([Board]),
  //     ],
  //     controllers: [BoardController],
  //     providers: [
  //       BoardProfile,
  //       BoardService,
  //       { provide: BoardGateway, useClass: BoardRepository },
  //       // { provide: UserService, useValue: mockUserService },
  //     ],
  //   })
  //     // .overrideProvider(BoardService)
  //     // .useValue(mockService)
  //     .compile()
  //     .catch((err) => {
  //       console.error(err);
  //       throw err;
  //     });

  //   controller = moduleFixture.get<BoardController>(BoardController);
  //   app = moduleFixture.createNestApplication();
  //   await app.init();
  // });

  afterEach(() => {
    jest.resetAllMocks();
  });

  // {
  //   id: expect.any(String),
  //}

  it('Example controller test', async () => {
    const module = await createDefaultTestingModule();
    const command = new CreateCommand('From_the_test');
    const expected = await module.controller.create(command);
    expect(expected).toEqual(new CreateResponse('From_the_test'));
  });

  // Prefer to run  e2e as it will also test the body mapping profile
  it('When no body then status code 500', async () => {
    const { app } = await createDefaultTestingModule();
    await app.init();
    return request(app.getHttpServer()).post('/').expect(500);
  });

  it('When record with the same name return conflict', async () => {
    const { app } = await createDefaultTestingModule();
    await app.init();

    const repo = app.get<Repository<Board>>(getRepositoryToken(Board));
    const board = repo.create({ name: 'test' });
    await repo.save(board);
    return request(app.getHttpServer())
      .post('/')
      .send({
        boardName: 'test',
      })
      .expect(409);
  });

  it('When record created, return board object with name', async () => {
    const { app } = await createDefaultTestingModule();
    await app.init();

    return request(app.getHttpServer())
      .post('/')
      .send({
        boardName: 'Test-123-44',
      })
      .expect(201)
      .expect({ name: 'Test-123-44' });
  });
});
