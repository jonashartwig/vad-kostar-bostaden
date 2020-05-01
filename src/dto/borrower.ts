export default class Borrower {
  salary: number
  name: string
  downPayment: number

  constructor(name: string, salary: number, downPayment: number) {
    this.name = name
    this.salary = salary
    this.downPayment = downPayment
  }
}
