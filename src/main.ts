import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { Logger } from "@nestjs/common";
import { NodeSDK } from "@opentelemetry/sdk-node";
import {
  SimpleSpanProcessor,
  ConsoleSpanExporter,
} from "@opentelemetry/sdk-trace-base";
async function bootstrap() {
  const sdk = new NodeSDK({
    traceExporter: new ConsoleSpanExporter(),
    sampler: { shouldSample: () => ({ decision: 1 }) },
  });

  sdk.start();

  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  });

  await app.listen(3333);
  Logger.log("Application is running on: http://localhost:3333");
}

bootstrap();
