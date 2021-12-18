import { expect, use } from "chai";
import chaiExclude from "chai-exclude";
import { describe, it } from "mocha";

import Bill, { BILL_FREQUENCY } from "../src/dto/Bill";

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
});
