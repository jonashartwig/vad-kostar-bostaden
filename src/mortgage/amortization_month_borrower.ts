import amortization from "./amortization_month";

export default function(price: number, loan: number, salary: number, borrowerCount: number): number {
  if(borrowerCount <= 1) {
    return NaN;
  }

  return amortization(price, loan, salary) / borrowerCount;
}
