export function toBRLCurrency(value: number): string {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

export function parseBRLCurrency(value: string): number {
  const number = parseFloat(value.replace(/[^\d,-]/g, "").replace(",", "."));

  return isNaN(number) ? NaN : number;
}
