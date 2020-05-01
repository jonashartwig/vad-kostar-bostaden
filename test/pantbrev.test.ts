import { expect } from 'chai';
import pantbrev from '../src/mortgage/pantbrev';

describe("pantbrev", () => {
  it("should calculte right for my house", () => {
    expect(pantbrev(4577250, 1450400)).to.equal(62912);
  });
});
