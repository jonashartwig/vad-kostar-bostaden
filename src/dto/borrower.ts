import { v4 } from "uuid";

export default class Borrower {
  salary: number
  name: string
  downPayment: number
  private id: string

  constructor(name: string, salary: number, downPayment: number) {
    this.name = name
    this.salary = salary
    this.downPayment = downPayment
    this.id = v4()
  }

  getId(): string {
    return this.id;
  }
}
