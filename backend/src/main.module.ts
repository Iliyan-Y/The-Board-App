import { Module } from '@nestjs/common';
import { AppModule } from './Modules/app.module';
import { AutomapperModule } from '@automapper/nestjs';
import { classes } from '@automapper/classes';

@Module({
  imports: [
    AppModule,
    AutomapperModule.forRoot({
      strategyInitializer: classes(),
    }),
  ],
})
export class MainModule {}
