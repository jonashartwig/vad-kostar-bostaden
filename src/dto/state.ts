import Borrower from "./borrower";
import debtRatio from "../mortgage/debt_ratio";
import * as downPayment from "../mortgage/down_payment";

export default class State {
  borrowers: Borrower[]
  price: number
  pantbrev: number

  constructor() {
    this.borrowers = [new Borrower("Jonas", 59000, 0), new Borrower("Emelie", 46700, 0)];
    this.price = 5385000;
    this.pantbrev = 1450400
  }

  addBorrower(borrower: Borrower) {
    this.borrowers = [...this.borrowers, borrower || new Borrower("", 0, 0)];

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
}
