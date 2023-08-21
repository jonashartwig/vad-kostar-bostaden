import { JsonProperty, Serializable, deserialize as deserializeAsJson, serialize as serializeAsJson } from "typescript-json-serializer";

import Bill from "./bill";
import Borrower from "./borrower";
import { Type } from "./type";
import debtRatio from "../modules/debt_ratio";
import * as downPayment from "../modules/down_payment";
import amortizationPercent from "../modules/amortization_percent";
import amortizationPerYear, { amortizationPerMonth, amortizationPerMonthPerBorrower } from "../modules/amortization";
import interestPerYear, { interestPerMonth, interestPerMonthPerBorrower } from "../modules/interest";
import { getInitialLanguage } from "../modules/language";
import { error as toastr } from "../modules/toastr";

@Serializable()
export default class State {
  @JsonProperty({ type: Bill }) bills: Array<Bill>;
  @JsonProperty({ type: Borrower }) borrowers: Array<Borrower>;
  @JsonProperty() price: number;
  @JsonProperty() pantbrev: number;
  @JsonProperty() interest: number;
  @JsonProperty() type: Type;
  @JsonProperty() language: string; 

  constructor(bills: Array<Bill> = [], borrowers: Array<Borrower> = [], price: number = 0, pantbrev: number = 0.02 * price, interest: number = 0.0417, type = Type.APPARTMENT) {
    this.bills = bills;
    this.borrowers = borrowers;
    this.price = price;
    this.pantbrev = pantbrev;
    this.type = type;
    this.interest = interest;
  }

  getLanguageOrDefault(): string {
    return this.language || getInitialLanguage();
  }

  withLanguage(language: string): State {
    this.language = language;

    return this;
  }

  addBill(bill: Bill = new Bill()): State {
    this.bills = [...this.bills, bill];

    return this;
  }

  removeBill(id: string): State {
    this.bills = this.bills.filter(bill => bill.getId() != id)

    return this;
  }

  addBorrower(borrower: Borrower = new Borrower()): State {
    this.borrowers = [...this.borrowers, borrower];

    return this;
  }

  removeBorrower(id: string): State {
    this.borrowers = this.borrowers.filter(borrower => borrower.getId() != id);

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
    return debtRatio(this.getCombinedSalary());
  }

  getLoan(): number {
    return this.price - this.getCombinedDownPaymentOrMinimum(this.price);
  }

  getAmortizationRate(): number {
    return amortizationPercent(this.price, this.getLoan(), this.getCombinedSalary());
  }

  getAmortizationPerYear(): number {
    return amortizationPerYear(this.price, this.getLoan(), this.getCombinedSalary());
  }

  getAmortizationPerMonth(): number {
    return amortizationPerMonth(this.price, this.getLoan(), this.getCombinedSalary());
  }

  getAmortizationPerMonthPerBorrower(): number {
    return amortizationPerMonthPerBorrower(this.price, this.getLoan(), this.getCombinedSalary(), this.borrowers.length);
  }

  getInterestPerYear(): number {
    return interestPerYear(this.interest, this.getLoan());
  }

  getInterestPerMonth(): number {
    return interestPerMonth(this.interest, this.getLoan());
  }

  getInterestPerMonthPerBorrower(): number {
    return interestPerMonthPerBorrower(this.interest, this.getLoan(), this.borrowers.length);
  }

  serialize(): object {
    return State.serialize(this);
  }

  serializeToString(): string {
    return State.serializeToString(this);
  }

  isHouse(): boolean {
    return this.type == Type.HOUSE || this.type == undefined;
  }

  isAppartment(): boolean {
    return !this.isHouse();
  }

  getYearlyBillAmount(): number {
    return this.bills.map(bill => bill.getAmountPerYear()).reduce((accumulator, value) => accumulator + (value || 0), 0);
  }

  getMonthlyBillAmount(): number {
    return this.bills.map(bill => bill.getAmountPerMonth()).reduce((accumulator, value) => accumulator + (value || 0), 0);
  }

  getMonthlyBillAmountByBorrower(): number {
    return (this.getMonthlyBillAmount() / this.borrowers.length) || 0;
  }

  serializeToBase64String(): string {
    return State.serializeToBase64String(this);
  }

  static serialize(state: State): object {
    return serializeAsJson(state);
  }

  static serializeToBase64String(state: State): string {
    return btoa(State.serializeToString(state));
  }

  static serializeToString(state: State): string {
    return JSON.stringify(State.serialize(state));
  }

  static deserializeFromBase64String(base64String: string): State {
    try {
      return State.deserializeFromString(atob(base64String));
    } catch(error) {
      console.log(error);
      
      toastr(getInitialLanguage(), "stateParsefailure");

      return new State();
    }
  }

  static deserializeFromString(json: string): State {
    return State.deserialize(JSON.parse(json));
  }

  static deserialize(json: object): State {
    return deserializeAsJson<State>(json, State);
  }
}
