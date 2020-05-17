import { expect } from 'chai';
import mortgageDeed from '../src/modules/mortgage_deed';

describe("pantbrev", () => {
  it("should calculte right for my house", () => {
    expect(mortgageDeed(4577250, 1450400)).to.equal(62912);
  });
});
