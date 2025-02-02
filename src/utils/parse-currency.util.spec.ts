import { toBRLCurrency, parseBRLCurrency } from "./parse-currency.util";

describe("Currency Utils", () => {
  describe("toBRLCurrency", () => {
    it("should format a number as BRL currency", () => {
      expect(toBRLCurrency(1234.56)).toBe("R$ 1.234,56");
      expect(toBRLCurrency(-5000.75)).toBe("-R$ 5.000,75");
      expect(toBRLCurrency(0)).toBe("R$ 0,00");
    });
  });

  describe("parseBRLCurrency", () => {
    it("should parse a BRL currency string to a number", () => {
      expect(parseBRLCurrency("R$ 1.234,56")).toBe(1234.56);
      expect(parseBRLCurrency("R$ -5.000,75")).toBe(-5000.75);
      expect(parseBRLCurrency("1.234,56")).toBe(1234.56);
    });

    it("should return NaN for invalid strings", () => {
      expect(parseBRLCurrency("invalid")).toBeNaN();
      expect(parseBRLCurrency("R$ abc")).toBeNaN();
    });

    it("should handle empty strings", () => {
      expect(parseBRLCurrency("")).toBeNaN();
    });
  });
});
