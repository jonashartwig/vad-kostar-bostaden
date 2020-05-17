import { JsonProperty, Serializable, deserialize as deserializeAsJson, serialize as serializeAsJson } from "typescript-json-serializer";

import Lender from "./lender";
import debtRatio from "../mortgage/debt_ratio";
import * as downPayment from "../mortgage/down_payment";
import amortizationPercent from "../mortgage/amortization_percent";
import amortizationPerYear, { amortizationPerMonth, amortizationPerMonthPerLender } from "../mortgage/amortization";
import interestPerYear, { interestPerMonth, interestPerMonthPerLender } from "../mortgage/interest";

@Serializable()
export default class State {
  @JsonProperty({ type: Lender }) lenders: Array<Lender>;
  @JsonProperty() price: number;
  @JsonProperty() pantbrev: number;
  @JsonProperty() interest: number;

  constructor() {
    this.lenders = [new Lender("Jonas", 59000, 0), new Lender("Emelie", 46700, 0)];
    this.price = 5385000;
    this.pantbrev = 1450400;
    this.interest = 0.0133;
  }

  addLender(borrower: Lender): State {
    this.lenders = [...this.lenders, borrower || new Lender("", 0, 0)];

    return this;
  }

  removeLender(id: string): State {
    this.lenders = this.lenders.filter(borrower => borrower.getId() != id)

    return this;
  }

  getCombinedSalary(): number {
    return 12 * this.lenders.reduce((accumulator, value) => accumulator + (value.salary || 0), 0);
  }

  getCombinedDownPayment(): number {
    return this.lenders.reduce((accumulator, value) => accumulator + (value.downPayment || 0), 0);
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

  getAmortizationPerMonthPerLender(): number {
    return amortizationPerMonthPerLender(this.price, this.getLoan(), this.getCombinedSalary(), this.lenders.length)
  }

  getInterestPerYear(): number {
    return interestPerYear(this.interest, this.getLoan())
  }

  getInterestPerMonth(): number {
    return interestPerMonth(this.interest, this.getLoan())
  }

  getInterestPerMonthPerLender(): number {
    return interestPerMonthPerLender(this.interest, this.getLoan(), this.lenders.length)
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
