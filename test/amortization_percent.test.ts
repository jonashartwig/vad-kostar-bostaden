import { expect } from 'chai';
import amortizationPercent from '../src/mortgage/amortization_percent';

describe("amortization_percent", () => {
  it("should calculte right with 50% payed", () => {
    expect(amortizationPercent(2000000, 1000000, 300000)).to.equal(0);
  });

  it("should calculte right with load to debt ratio 3%", () => {
    expect(amortizationPercent(2000000, 1700000, 300000)).to.equal(0.03);
  });

  it("should calculte right with load to debt ratio 2% on loan to debt ratio and loan to value", () => {
    expect(amortizationPercent(2000000, 1400000, 300000)).to.equal(0.02);
  });

  it("should calculte right with load to debt ratio 2% on loan to value", () => {
    expect(amortizationPercent(2000000, 1600000, 1000000)).to.equal(0.02);
  });

  it("should calculte right with load to debt ratio 1% on loan to debt ratio", () => {
    expect(amortizationPercent(2000000, 1000000, 10000)).to.equal(0.01);
  });

  it("should calculte right with load to debt ratio 1% on loan to value", () => {
    expect(amortizationPercent(2000000, 1400000, 1000000)).to.equal(0.01);
  });

  it("should calculte right for my house", () => {
    expect(amortizationPercent(5385000, 4577250, 1268400)).to.equal(0.02);
  });
});
