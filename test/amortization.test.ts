import { expect } from 'chai';
import amortization from '../src/mortgage/amortization';

describe("amortization", () => {
  it("should calculte right for my house", () => {
    expect(amortization(5385000, 4577250, 1268400)).to.equal(91545);
  });
});
