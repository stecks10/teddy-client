export const parseCurrency = (value: string): number => {
  const numberValue = value.replace(/[^\d.-]/g, "");
  return parseFloat(numberValue);
};
