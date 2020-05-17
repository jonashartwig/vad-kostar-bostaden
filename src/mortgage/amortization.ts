import amortizationPercent from "./amortization_percent";

export function amortizationPerMonthPerLender(price: number, loan: number, salary: number, lenderCount: number): number {
  if(lenderCount <= 0) {
    return NaN;
  }

  return amortizationPerMonth(price, loan, salary) / lenderCount;
}

export function amortizationPerMonth(price: number, loan: number, salary: number): number {
  return amortizationPerYear(price, loan, salary) / 12;
}

export default function amortizationPerYear(price: number, loan: number, salary: number): number {
  return amortizationPercent(price, loan, salary) * loan
}
