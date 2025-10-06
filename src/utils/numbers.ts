type FormatNumberForDisplayProps = {
  value: number;
  locales?: string | string[];
  decimalMin?: number;
  decimalMax?: number;
};

export const formatNumberForDisplay = ({
  value,
  locales,
  decimalMin = 2,
  decimalMax = 2,
}: FormatNumberForDisplayProps) => {
  const formatter = new Intl.NumberFormat(locales, {
    minimumFractionDigits: decimalMin,
    maximumFractionDigits: decimalMax,
  });

  return formatter.format(value);
};

export const subtractNumbers = (
  a: number,
  b: number,
  precision: number = 2
) => {
  const multiplier = Math.pow(10, precision);
  return (a * multiplier - b * multiplier) / multiplier;
};
