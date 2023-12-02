import { TypeOrmModule } from '@nestjs/typeorm';
import { Board } from 'src/Gateways/Board/entity';

export const TypeOrmSQLITETestingModule = () => [
  TypeOrmModule.forRoot({
    type: 'better-sqlite3',
    database: ':memory:',
    dropSchema: true,
    entities: [Board],
    synchronize: true,
  }),
  // CUSTOM DATA SOURCE EXAMPLE
  // TypeOrmModule.forRootAsync({
  //   imports: [ConfigModule],
  //   inject: [ConfigService],
  //   // eslint-disable-next-line @typescript-eslint/no-unused-vars
  //   useFactory: (configService: ConfigService) => ({
  //     type: 'better-sqlite3',
  //     database: ':memory:',
  //     dropSchema: true,
  //     entities: [Board],
  //     synchronize: true,
  //   }),
  //   dataSourceFactory: async (options) => {
  //     const dataSource = await new DataSource(options).initialize();
  //     return dataSource;
  //   },
  // }),
  TypeOrmModule.forFeature([Board]),
];
