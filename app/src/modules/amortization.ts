import amortizationPercent from "./amortization_percent";

export function amortizationPerMonthPerBorrower(price: number, loan: number, salary: number, borrowerCount: number): number {
  if(borrowerCount <= 0) {
    return NaN;
  }

  return amortizationPerMonth(price, loan, salary) / borrowerCount;
}

export function amortizationPerMonth(price: number, loan: number, salary: number): number {
  return amortizationPerYear(price, loan, salary) / 12;
}

export default function amortizationPerYear(price: number, loan: number, salary: number): number {
  return amortizationPercent(price, loan, salary) * loan
}
