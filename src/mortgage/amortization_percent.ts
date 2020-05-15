import loanToValue from "./loan_to_value";
import debtRatio from "./debt_ratio";

export const loanLevelValueStep1 = 0.7, // this needs to be reached for 1%
  loanLevelStep2 = 0.5; // this needs to be reached for 0%

export function isLoadGreaterThenDebtRatio(loan: number, debtRatio: number): boolean {
  return loan > debtRatio;
}

export function loanToDebtRatioPercent(loan: number, debtRatio: number): number {
  if(isLoadGreaterThenDebtRatio(loan, debtRatio)) {
    return 0.01;
  } else {
    return 0;
  }
}

export function isLoanHalfOrLessOfPrice(price: number, loan: number): boolean {
  const loanToValueRatio = loanToValue(price, loan)

  return loanToValueRatio <= loanLevelStep2;
}

export function isLoanMoreThenHalfButLessThenLoanLevel(price: number, loan: number): boolean {
  const loanToValueRatio = loanToValue(price, loan)

  return loanToValueRatio > loanLevelStep2 && loanToValueRatio <= loanLevelValueStep1;
}

export function loanToValuePercent(price: number, loan: number): number {
  if(isLoanHalfOrLessOfPrice(price, loan)) {
    return 0;
  } else if(isLoanMoreThenHalfButLessThenLoanLevel(price, loan)) {
    return 0.01;
  } else {
    return 0.02;
  }
}

export default function (price: number, loan: number, salary: number): number {
  return loanToValuePercent(price, loan) + loanToDebtRatioPercent(loan, debtRatio(salary));
}
