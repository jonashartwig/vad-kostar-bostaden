import { expect } from 'chai';
import lagfart from '../src/mortgage/lagfart';

describe("lagfart", () => {
  it("should calculte right for my house", () => {
    expect(lagfart(5385000)).to.equal(81600);
  });
});
