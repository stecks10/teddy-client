import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { Logger } from "@nestjs/common";
import { NodeSDK } from "@opentelemetry/sdk-node";
import { ConsoleSpanExporter } from "@opentelemetry/sdk-trace-base";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { collectDefaultMetrics } from "prom-client";

async function bootstrap() {
  collectDefaultMetrics();

  const sdk = new NodeSDK({
    traceExporter: new ConsoleSpanExporter(),
    sampler: { shouldSample: () => ({ decision: 1 }) },
  });

  sdk.start();

  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle("Client API")
    .setDescription("API para gerenciamento de clientes")
    .setVersion("1.0")
    .addTag("clients")
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("clients/api", app, document);

  app.enableCors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  });

  await app.listen(3333);
  Logger.log("Application is running on: http://localhost:3333");
}

bootstrap();
