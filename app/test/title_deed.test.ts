import { expect } from "chai";
import { describe, it } from "mocha";

import titleDeed from "../src/modules/title_deed";

describe("lagfart", () => {
  it("should calculte right for my house", () => {
    expect(titleDeed(5385000)).to.equal(81600);
  });
});
