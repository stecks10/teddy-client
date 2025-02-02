import { Injectable } from "@nestjs/common";
import { LoggerServiceImpl } from "./logger/logger.service";

@Injectable()
export class AppService {
  constructor(private readonly logger: LoggerServiceImpl) {}

  getHello(): string {
    this.logger.log("Hello Teddy client!");
    return "Hello  teddy client!";
  }
}
