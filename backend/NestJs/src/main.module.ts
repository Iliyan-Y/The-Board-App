import { Module } from "@nestjs/common";
import { AutomapperModule } from "@automapper/nestjs";
import { classes } from "@automapper/classes";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule } from "@nestjs/config";
import { BoardModule } from "./Modules/Board/board.module";
import { TaskModel } from "./Domain/Task/mode";

const appModules = [BoardModule, TaskModel];

@Module({
  imports: [
    ConfigModule.forRoot(),
    AutomapperModule.forRoot({
      strategyInitializer: classes(),
    }),
    TypeOrmModule.forRoot({
      type: "postgres",
      host: "localhost",
      port: 5432,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      autoLoadEntities: true,
      synchronize: true, // shouldn't be used in production - otherwise you can lose production data.
    }),
    ...appModules,
  ],
})
export class MainModule {}
