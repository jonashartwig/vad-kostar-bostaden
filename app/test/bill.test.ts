import { expect, use } from "chai";
import chaiExclude from "chai-exclude";
import { describe, it } from "mocha";

import Bill, { BILL_FREQUENCY } from "../src/dto/bill";

describe("bill", () => {
  before(() => {
    use(chaiExclude);
  });

  it("should calculate correct yearly amount by yearly bill", () => {
    expect(new Bill("name", 100, BILL_FREQUENCY.YEARLY).getAmountPerYear()).to.equal(100)
  })

  it("should calculate correct yearly amount by monthly bill", () => {
    expect(new Bill("name", 100, BILL_FREQUENCY.MONTHLY).getAmountPerYear()).to.equal(1200)
  })

  it("should calculate correct yearly amount by quaterly bill", () => {
    expect(new Bill("name", 100, BILL_FREQUENCY.QUATERLY).getAmountPerYear()).to.equal(400)
  })

  it("should calculate correct monthly amount by yearly bill", () => {
    expect(new Bill("name", 120, BILL_FREQUENCY.YEARLY).getAmountPerMonth()).to.equal(10)
  })

  it("should calculate correct monthly amount by monthly bill", () => {
    expect(new Bill("name", 100, BILL_FREQUENCY.MONTHLY).getAmountPerMonth()).to.equal(100)
  })

  it("should calculate correct monthly amount by quaterly bill", () => {
    expect(new Bill("name", 400, BILL_FREQUENCY.QUATERLY).getAmountPerMonth()).to.equal(100)
  })
});
