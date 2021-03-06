import { v4 } from "uuid";
import { JsonProperty, Serializable } from "typescript-json-serializer";

@Serializable()
export default class Borrower {
  @JsonProperty() salary: number;
  @JsonProperty() name: string;
  @JsonProperty() downPayment: number;
  private id: string;

  constructor(name: string = "", salary: number = 0, downPayment: number = 0) {
    this.name = name;
    this.salary = salary;
    this.downPayment = downPayment;
    this.id = v4();
  }

  getId(): string {
    return this.id;
  }
}
