import loanToValue from "./loan_to_value";
import debtRatio from "./debt_ratio";

function loanToDebtRatioPercent(loan: number, debtRatio: number): number {
  if(loan > debtRatio) {
    return 0.01;
  } else {
    return 0;
  }
}

function loanToValuePercent(loanToValue: number): number {
  if(loanToValue <= 0.5) {
    return 0;
  } else if(loanToValue <= 0.7) {
    return 0.01;
  } else {
    return 0.02;
  }
}

export default function (price: number, loan: number, salary: number): number {
  return loanToValuePercent(loanToValue(price, loan)) + loanToDebtRatioPercent(loan, debtRatio(salary));
}
