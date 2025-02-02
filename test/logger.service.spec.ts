import { LoggerServiceImpl } from "../src/logger/logger.service";
import * as winston from "winston";

describe("LoggerServiceImpl", () => {
  let logger: LoggerServiceImpl;
  let winstonLogger: winston.Logger;

  beforeEach(() => {
    logger = new LoggerServiceImpl();
    winstonLogger = (logger as any).logger; // Acessa o logger interno do winston
  });

  it("should be defined", () => {
    expect(logger).toBeDefined();
  });

  it("should log info messages", () => {
    const infoSpy = jest
      .spyOn(winstonLogger, "info")
      .mockImplementation(() => ({}) as winston.Logger);
    logger.log("Test info message");
    expect(infoSpy).toHaveBeenCalledWith("Test info message");
  });

  it("should log warn messages", () => {
    const warnSpy = jest
      .spyOn(winstonLogger, "warn")
      .mockImplementation(() => ({}) as winston.Logger);
    logger.warn("Test warning message");
    expect(warnSpy).toHaveBeenCalledWith("Test warning message");
  });

  it("should log error messages", () => {
    const errorSpy = jest
      .spyOn(winstonLogger, "error")
      .mockImplementation(() => ({}) as winston.Logger);
    logger.error("Test error message", "Test stack trace");
    expect(errorSpy).toHaveBeenCalledWith(
      "Test error message - Test stack trace"
    );
  });

  it("should log debug messages", () => {
    const debugSpy = jest
      .spyOn(winstonLogger, "debug")
      .mockImplementation(() => ({}) as winston.Logger);
    logger.debug("Test debug message");
    expect(debugSpy).toHaveBeenCalledWith("Test debug message");
  });

  it("should log verbose messages", () => {
    const verboseSpy = jest
      .spyOn(winstonLogger, "verbose")
      .mockImplementation(() => ({}) as winston.Logger);
    logger.verbose("Test verbose message");
    expect(verboseSpy).toHaveBeenCalledWith("Test verbose message");
  });
});
