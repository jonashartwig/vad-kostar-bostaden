import { expect } from "chai";
import { describe, it } from "mocha";

import loanToValue from "../src/modules/loan_to_value";

describe("loanToValue", () => {
  it("should calculate ratio", () => {
    expect(loanToValue(1000000, 500000)).to.equal(0.5);
  });

  it("should handle case 0 for price", () => {
    expect(loanToValue(0, 500000)).to.be.NaN;
  });

  it("should handle case 0 for loan", () => {
    expect(loanToValue(500000, 0)).to.equal(100);
  });
});
