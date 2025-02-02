import { Injectable } from "@nestjs/common";
import { Counter, Histogram, collectDefaultMetrics } from "prom-client";

@Injectable()
export class MetricsService {
  private requestCounter: Counter<string>;
  private requestDuration: Histogram<string>;

  constructor() {
    collectDefaultMetrics();

    this.requestCounter = new Counter({
      name: "http_requests_total",
      help: "Total HTTP requests made",
    });

    this.requestDuration = new Histogram({
      name: "http_request_duration_seconds",
      help: "Duration of HTTP requests in seconds",
      buckets: [0.1, 0.5, 1, 2, 5, 10],
    });
  }

  incrementRequestCount() {
    this.requestCounter.inc();
  }

  recordRequestDuration(duration: number) {
    this.requestDuration.observe(duration);
  }
}
