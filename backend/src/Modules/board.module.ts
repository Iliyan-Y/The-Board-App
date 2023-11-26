import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardController } from 'src/API/Board/controller';
import { BoardService } from 'src/Domain/Board/service';
import { BoardRepository } from 'src/Gateways.DB/Board/repository';
import { Board } from 'src/Gateways/Board/entity';
import { BoardGateway } from 'src/Gateways/Board/gateway';

@Module({
  imports: [TypeOrmModule.forFeature([Board])],
  controllers: [BoardController],
  providers: [
    BoardService,
    { provide: BoardGateway, useClass: BoardRepository },
  ],
})
export class BoardModule {}
