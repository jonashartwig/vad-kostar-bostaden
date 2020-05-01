import amortization from "./amortization";

export default function(price: number, loan: number, salary: number): number {
  return amortization(price, loan, salary) / 12;
}
