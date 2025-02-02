import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { Logger } from "@nestjs/common";
import { NodeSDK } from "@opentelemetry/sdk-node";
import { ConsoleSpanExporter } from "@opentelemetry/sdk-trace-base";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { collectDefaultMetrics } from "prom-client";
import * as dotenv from "dotenv";

dotenv.config();

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

  console.log("CORS está configurado para o frontend:", process.env.FRONT_URL);

  app.enableCors({
    origin: process.env.FRONT_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  });

  const PORT = process.env.PORT || 3333;
  await app.listen(PORT);
  Logger.log(`Application is running on: http://localhost:${PORT}`);
}

bootstrap();
