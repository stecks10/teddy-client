import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ClientModule } from "./client/client.module";
import { Client } from "./client/client.entity";
import { LoggerModule } from "./logger/logger.module";
import * as dotenv from "dotenv";

dotenv.config();

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "postgres",
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [Client],
      synchronize: process.env.DB_SYNCHRONIZE === "true",
      logging: process.env.DB_LOGGING === "true",
      logger: "advanced-console",
    }),

    ClientModule,
    LoggerModule,
  ],
})
export class AppModule {}
