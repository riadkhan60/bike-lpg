export function currencyFormatter(num: number) {
  return (
    '৳ ' +
    new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(num)
  );
}
