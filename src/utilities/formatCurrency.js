export const formatCurrency = (amount) => {
  if (!amount) {
    return;
  }
  return new Intl.NumberFormat("en-BD", {
    style: "currency",
    currency: "BDT",
    maximumSignificantDigits: 3,
  }).format(amount);
};
