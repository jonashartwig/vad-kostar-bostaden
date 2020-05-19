import { expect } from "chai";
import "mock-local-storage";

import * as save from '../src/modules/save';
import State from "../src/dto/state";

describe("save", () =>{
  beforeEach(() => {
    localStorage.clear();
  });

  it("should return undefined", () => {
    expect(save.loadFromLocalStorage()).to.be.undefined;
  });

  it("should create new state", () => {
    save.saveToLocalStorage(new State([], 10));

    expect(save.loadFromLocalStorage().price).to.equal(10);
  });
});
