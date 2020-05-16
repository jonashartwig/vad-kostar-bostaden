import { expect } from 'chai';
import titleDeed from '../src/mortgage/title_deed';

describe("lagfart", () => {
  it("should calculte right for my house", () => {
    expect(titleDeed(5385000)).to.equal(81600);
  });
});
