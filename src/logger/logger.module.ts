import { Module } from "@nestjs/common";
import { LoggerServiceImpl } from "./logger.service"; // A classe do Logger

@Module({
  providers: [LoggerServiceImpl], // Declara o serviço como provider
  exports: [LoggerServiceImpl], // Exporta o serviço para outros módulos
})
export class LoggerModule {}
