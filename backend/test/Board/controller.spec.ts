import { BoardController } from '../../src/API/Board/controller';
import { Board } from '../../src/Gateways/Board/entity';

import * as httpMocks from 'node-mocks-http';
import { TestingModule } from '@nestjs/testing/testing-module';
import { Test } from '@nestjs/testing';
import { BoardService, CreateCommand } from '../../src/Domain/Board/service';
import { AutomapperModule } from '@automapper/nestjs';
import { classes } from '@automapper/classes';
import { BoardProfile } from 'src/Modules/Board/mapper.profile';
import { BoardGateway } from 'src/Gateways/Board/gateway';
import { BoardRepository } from 'src/Gateways.DB/Board/repository';
import { TypeOrmSQLITETestingModule } from './helpers';

describe('board controller', () => {
  let controller: BoardController;
  // todo create request to match controller expectations
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
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [
        AutomapperModule.forRoot({
          strategyInitializer: classes(),
        }),
        ...TypeOrmSQLITETestingModule(),
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

    controller = moduleRef.get<BoardController>(BoardController);
  });

  it('should create', () => {
    const command = new CreateCommand('From_the_test');
    expect(controller.create(command)).toEqual({
      id: expect.any(Number),
    });
  });
});
