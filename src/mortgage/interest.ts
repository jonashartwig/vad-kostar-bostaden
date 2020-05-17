export function interestPerMonthPerLender (interestPercent: number, loan: number, lenderCount: number): number {
  if(lenderCount <= 0) {
    return NaN;
  }
  return interestPerMonth(interestPercent, loan) / lenderCount;
}

export function interestPerMonth (interestPercent: number, loan: number): number {
  return interestPerYear(interestPercent, loan) / 12;
}

export default function interestPerYear (interestPercent: number, loan: number): number {
  return interestPercent * loan;
}
