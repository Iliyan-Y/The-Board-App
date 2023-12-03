import { Board } from '../../src/Gateways/Board/entity';
import { CreateCommand } from '../../src/Domain/Board/service';
import * as request from 'supertest';
import { CreateResponse } from 'src/API/Board/Models/createResponse';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { createDefaultTestingModule, mockDbModule } from './setup';

describe('board controller', () => {
  const url = '/';
  const body = {
    boardName: 'Test-123',
  };

  afterEach(() => {
    jest.resetAllMocks();
  });

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
    return request(app.getHttpServer()).post(url).expect(500);
  });

  it('When record with the same name return conflict', async () => {
    const { app } = await createDefaultTestingModule();
    await app.init();

    const repo = app.get<Repository<Board>>(getRepositoryToken(Board));
    const board = repo.create({ name: body.boardName });
    await repo.save(board);
    return request(app.getHttpServer()).post(url).send(body).expect(409);
  });

  it('When record created, return board object with name', async () => {
    const { app } = await createDefaultTestingModule();
    await app.init();

    return request(app.getHttpServer())
      .post(url)
      .send(body)
      .expect(201)
      .expect({ name: body.boardName });
  });

  it('Should check for exist once', async () => {
    const exist = jest.fn().mockImplementation((model: Board) => true);
    const mockService = { exist };

    const { app } = await mockDbModule(mockService);
    await app.init();

    await request(app.getHttpServer()).post(url).send(body);

    expect(exist).toHaveBeenCalledTimes(1);
  });

  it('If name exist will NOT try to create record', async () => {
    const exist = jest.fn().mockImplementation((model: Board) => true);
    const create = jest.fn().mockImplementation((model: Board) => {
      return {
        id: 'some-uuid',
        ...model,
      };
    });
    const mockService = { exist, create };

    const { app } = await mockDbModule(mockService);
    await app.init();

    await request(app.getHttpServer()).post(url).send(body);

    expect(create).not.toHaveBeenCalled();
  });

  it('If name not exist will try to create record', async () => {
    const create = jest.fn().mockImplementation((model: Board) => {
      return {
        id: 'some-uuid',
        ...model,
      };
    });

    const mockService = {
      exist: jest.fn().mockImplementation((model: Board) => false),
      create,
    };

    const { app } = await mockDbModule(mockService);
    await app.init();

    await request(app.getHttpServer()).post(url).send(body);

    expect(create).toHaveBeenCalledTimes(1);
  });
});
