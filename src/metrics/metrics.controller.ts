import { Controller, Get } from "@nestjs/common";
import { Registry, collectDefaultMetrics } from "prom-client";

@Controller("metrics")
export class MetricsController {
  private readonly registry: Registry;

  constructor() {
    this.registry = new Registry();
    collectDefaultMetrics({ register: this.registry });
  }

  @Get()
  getMetrics() {
    return this.registry.metrics();
  }
}
