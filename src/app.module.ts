import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ClientModule } from "./client/client.module";
import { Client } from "./client/client.entity";
import { LoggerModule } from "./logger/logger.module";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "postgres",
      host: "localhost",
      port: 5432,
      username: "postgres",
      password: "password",
      database: "client_management",
      entities: [Client],
      synchronize: true,
      logging: true,
      logger: "advanced-console",
    }),

    ClientModule,
    LoggerModule,
  ],
})
export class AppModule {}
