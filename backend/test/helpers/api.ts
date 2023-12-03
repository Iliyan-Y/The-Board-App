import { classes } from '@automapper/classes';
import { AutomapperModule } from '@automapper/nestjs';
import { Test, TestingModuleBuilder } from '@nestjs/testing';
import { TypeOrmTestingModule } from './db';
import { Provider } from '@nestjs/common';

export function createTestApi(
  entities: any[],
  controllers: any[],
  providers: Provider[],
): TestingModuleBuilder {
  return Test.createTestingModule({
    imports: [
      AutomapperModule.forRoot({
        strategyInitializer: classes(),
      }),
      ...TypeOrmTestingModule(entities),
    ],
    controllers,
    providers,
  });
}
