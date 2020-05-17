export default function loanToValue(price: number, loan: number): number {
  if(loan <= 0) {
    return 100;
  }

  if(price <= 0) {
    return NaN;
  }

  return loan / price;
}
