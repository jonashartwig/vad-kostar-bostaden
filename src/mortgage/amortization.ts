import amortizationPercent from "./amortization_percent";

export default function(price: number, loan: number, salary: number): number {
  return amortizationPercent(price, loan, salary) * loan
}
