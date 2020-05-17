import { expect } from 'chai';
import amortizationPerYear, { amortizationPerMonth, amortizationPerMonthPerLender } from '../src/mortgage/amortization';

describe("amortization", () => {
  it("amortizationPerYear should calculte right for my house", () => {
    expect(amortizationPerYear(5385000, 4577250, 1268400)).to.equal(91545);
  });

  it("amortizationPerMonth should calculte right for my house", () => {
    expect(amortizationPerMonth(5385000, 4577250, 1268400)).to.equal(7628.75);
  });

  it("amortizationPerMonthPerLender should calculte right for my house", () => {
    expect(amortizationPerMonthPerLender(5385000, 4577250, 1268400, 5)).to.equal(1525.75);
  });
});
