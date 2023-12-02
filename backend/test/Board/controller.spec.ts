import { BoardController } from '../../src/API/Board/controller';
import { Board } from '../../src/Gateways/Board/entity';
import * as httpMocks from 'node-mocks-http';
import { TestingModule } from '@nestjs/testing/testing-module';
import { Test } from '@nestjs/testing';
import {
  BoardService,
  CreateCommand,
  CreateResultStatus,
} from '../../src/Domain/Board/service';
import { AutomapperModule } from '@automapper/nestjs';
import { classes } from '@automapper/classes';
import { BoardProfile } from 'src/Modules/Board/mapper.profile';
import { BoardGateway } from 'src/Gateways/Board/gateway';
import { BoardRepository } from 'src/Gateways.DB/Board/repository';
import { TypeOrmTestingModule } from '../helpers/db';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { CreateResponse } from 'src/API/Board/Models/createResponse';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('board controller', () => {
  let app: INestApplication;
  let controller: BoardController;

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
  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        AutomapperModule.forRoot({
          strategyInitializer: classes(),
        }),
        ...TypeOrmTestingModule([Board]),
      ],
      controllers: [BoardController],
      providers: [
        BoardProfile,
        BoardService,
        { provide: BoardGateway, useClass: BoardRepository },
        // { provide: UserService, useValue: mockUserService },
      ],
    })
      // .overrideProvider(BoardService)
      // .useValue(mockService)
      .compile()
      .catch((err) => {
        console.error(err);
        throw err;
      });

    controller = moduleFixture.get<BoardController>(BoardController);
    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  // {
  //   id: expect.any(String),
  //}

  it('Example controller test', async () => {
    const command = new CreateCommand('From_the_test');
    const expected = await controller.create(command);
    expect(expected).toEqual(new CreateResponse('From_the_test'));
  });

  // Prefer to run  e2e as it will also test the body mapping profile
  it('When no body then status code 500', () => {
    return request(app.getHttpServer()).post('/').expect(500);
  });

  it('When record with the same name return conflict', async () => {
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

  it('When record created, return board object with name', () => {
    return request(app.getHttpServer())
      .post('/')
      .send({
        boardName: 'Test-123-44',
      })
      .expect(201)
      .expect({ name: 'Test-123-44' });
  });
});
