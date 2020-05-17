import { JsonProperty, Serializable, deserialize as deserializeAsJson, serialize as serializeAsJson } from "typescript-json-serializer";

import Borrower from "./borrower";
import debtRatio from "../modules/debt_ratio";
import * as downPayment from "../modules/down_payment";
import amortizationPercent from "../modules/amortization_percent";
import amortizationPerYear, { amortizationPerMonth, amortizationPerMonthPerBorrower } from "../modules/amortization";
import interestPerYear, { interestPerMonth, interestPerMonthPerBorrower } from "../modules/interest";

@Serializable()
export default class State {
  @JsonProperty({ type: Borrower }) borrowers: Array<Borrower>;
  @JsonProperty() price: number;
  @JsonProperty() pantbrev: number;
  @JsonProperty() interest: number;

  constructor(borrowers: Array<Borrower> = [], price: number = 0, pantbrev: number = 0, interest: number = 0) {
    this.borrowers = borrowers;
    this.price = price;
    this.pantbrev = pantbrev;
    this.interest = interest;
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

  getAmortizationPerYear(): number {
    return amortizationPerYear(this.price, this.getLoan(), this.getCombinedSalary())
  }

  getAmortizationPerMonth(): number {
    return amortizationPerMonth(this.price, this.getLoan(), this.getCombinedSalary())
  }

  getAmortizationPerMonthPerBorrower(): number {
    return amortizationPerMonthPerBorrower(this.price, this.getLoan(), this.getCombinedSalary(), this.borrowers.length)
  }

  getInterestPerYear(): number {
    return interestPerYear(this.interest, this.getLoan())
  }

  getInterestPerMonth(): number {
    return interestPerMonth(this.interest, this.getLoan())
  }

  getInterestPerMonthPerBorrower(): number {
    return interestPerMonthPerBorrower(this.interest, this.getLoan(), this.borrowers.length)
  }

  serialize(): object {
    return State.serialize(this);
  }

  serializeToString(): string {
    return State.serializeToString(this);
  }

  static serialize(state: State): object {
    return serializeAsJson(state);
  }

  static serializeToString(state: State): string {
    return JSON.stringify(State.serialize(state));
  }

  static deserializeFromString(json: string): State {
    return State.deserialize(JSON.parse(json));
  }

  static deserialize(json: object): State {
    return deserializeAsJson<State>(json, State);
  }
}
