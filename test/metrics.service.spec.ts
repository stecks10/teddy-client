import { Test, TestingModule } from "@nestjs/testing";
import { MetricsService } from "../src/metrics/metrics.service";
import { register } from "prom-client";

describe("MetricsService", () => {
  let service: MetricsService;

  beforeEach(async () => {
    register.clear();

    const module: TestingModule = await Test.createTestingModule({
      providers: [MetricsService],
    }).compile();

    service = module.get<MetricsService>(MetricsService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("should return metrics data", async () => {
    const metrics = await service.getMetrics();
    expect(metrics).toBeDefined();
    expect(typeof metrics).toBe("string");
    expect(metrics).toContain("http_requests_total");
    expect(metrics).toContain("http_request_duration_seconds");
  });
});
