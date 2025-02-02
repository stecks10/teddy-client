import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Client } from "./client.entity";
import { ClientService } from "./client.service";
import { ClientController } from "./client.controller";
import { LoggerModule } from "src/logger/logger.module";

@Module({
  imports: [TypeOrmModule.forFeature([Client]), LoggerModule],
  providers: [ClientService],
  controllers: [ClientController],
})
export class ClientModule {}
