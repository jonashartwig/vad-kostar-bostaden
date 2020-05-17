export function interestPerMonthPerBorrower (interestPercent: number, loan: number, borrowerCount: number): number {
  if(borrowerCount <= 0) {
    return NaN;
  }
  return interestPerMonth(interestPercent, loan) / borrowerCount;
}

export function interestPerMonth (interestPercent: number, loan: number): number {
  return interestPerYear(interestPercent, loan) / 12;
}

export default function interestPerYear (interestPercent: number, loan: number): number {
  return interestPercent * loan;
}
