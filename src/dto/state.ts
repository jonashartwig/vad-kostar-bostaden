import Borrower from "./borrower";
import debtRatio from "../mortgage/debt_ratio";
import * as downPayment from "../mortgage/down_payment";
import amortizationPercent from "../mortgage/amortization_percent";

export default class State {
  borrowers: Borrower[]
  price: number
  pantbrev: number
  interest: number

  constructor() {
    this.borrowers = [new Borrower("Jonas", 59000, 0), new Borrower("Emelie", 46700, 0)];
    this.price = 5385000;
    this.pantbrev = 1450400
    this.interest = 0.0133
  }

  addBorrower(borrower: Borrower): State {
    this.borrowers = [...this.borrowers, borrower || new Borrower("", 0, 0)];

    return this;
  }

  removeBorrower(id: string): State {
    this.borrowers = this.borrowers.filter(borrower => borrower.getId() != id)

    return this;
  }

  getCombinedSalary(): number {
    return 12 * this.borrowers.reduce((accumulator, value) => accumulator + (value.salary || 0), 0);
  }

  getCombinedDownPayment(): number {
    return this.borrowers.reduce((accumulator, value) => accumulator + (value.downPayment || 0), 0);
  }

  getCombinedDownPaymentOrMinimum(price: number): number {
    return this.getCombinedDownPayment() || downPayment.total(price);
  }

  getDebtRatio(): number {
    return debtRatio(this.getCombinedSalary())
  }

  getLoan(): number {
    return this.price - this.getCombinedDownPaymentOrMinimum(this.price)
  }

  getAmortizationRate(): number {
    return amortizationPercent(this.price, this.getLoan(), this.getCombinedSalary())
  }
}
