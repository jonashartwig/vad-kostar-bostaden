import loanToValue from "./loan_to_value";
import debtRatio from "./debt_ratio";

export function loanToDebtRatioPercent(loan: number, debtRatio: number): number {
  if(loan > debtRatio) {
    return 0.01;
  } else {
    return 0;
  }
}

export function loanToValuePercent(price: number, loan: number): number {
  const loanToValueRatio = loanToValue(price, loan)

  if(loanToValueRatio <= 0.5) {
    return 0;
  } else if(loanToValueRatio <= 0.7) {
    return 0.01;
  } else {
    return 0.02;
  }
}

export default function (price: number, loan: number, salary: number): number {
  return loanToValuePercent(price, loan) + loanToDebtRatioPercent(loan, debtRatio(salary));
}
