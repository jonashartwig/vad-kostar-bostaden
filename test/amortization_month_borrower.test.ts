import { expect } from 'chai';
import amortization from '../src/mortgage/amortization_month_borrower';

describe("amortization_month_borrower", () => {
  it("should calculte right for my house", () => {
    expect(amortization(5385000, 4577250, 1268400, 5)).to.equal(1525.75);
  });
});
