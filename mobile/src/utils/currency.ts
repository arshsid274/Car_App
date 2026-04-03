export const formatAED = (amount: number) =>
  new Intl.NumberFormat("en-AE", {
    style: "currency",
    currency: "AED",
    maximumFractionDigits: 0
  }).format(amount);

export const estimateMonthlyFinance = (
  carPrice: number,
  downPaymentRate = 0.2,
  months = 60,
  annualRate = 0.039
) => {
  const principal = carPrice * (1 - downPaymentRate);
  const monthlyRate = annualRate / 12;
  const payment =
    (principal * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -months));

  return Math.round(payment);
};

