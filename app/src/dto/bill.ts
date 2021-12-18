import { v4 } from "uuid";
import { JsonProperty, Serializable } from "typescript-json-serializer";

export enum BILL_FREQUENCY {
  MONTHLY = 1,
  QUATERLY,
  YEARLY
}

@Serializable()
export default class Bill {
  @JsonProperty() name: string;
  @JsonProperty() amount: number;
  @JsonProperty() frequency: BILL_FREQUENCY;
  private id: string;

  constructor(name: string = "", amount: number = 0, frequency: BILL_FREQUENCY = BILL_FREQUENCY.MONTHLY) {
    this.name = name;
    this.amount = amount;
    this.frequency = frequency
    this.id = v4();
  }

  getId(): string {
    return this.id;
  }

  getAmountPerYear(): number {
    if(this.frequency == BILL_FREQUENCY.YEARLY) {
      return this.amount;
    }

    if(this.frequency == BILL_FREQUENCY.QUATERLY) {
      return this.amount * 4;
    }

    return this.amount * 12;
  }
}
