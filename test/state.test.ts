import { expect, use } from "chai"
import chaiExclude from 'chai-exclude';

import State from "../src/dto/state";

describe("state", () => {
  before(() => {
    use(chaiExclude);
  });

  it("should serialize as object", () => {
    expect(new State().serialize()).to.deep.equal({
      "lenders":[
        {
          "salary": 59000,
          "name": "Jonas",
          "downPayment": 0
        },
        {
          "salary": 46700,
          "name": "Emelie", "downPayment":0
        }
      ],
      "price": 5385000,
      "pantbrev": 1450400,
      "interest": 0.0133
    });
  });

  it("should serialize as string", () => {
    expect(new State().serializeToString()).to.deep.equal("{\"lenders\":[{\"salary\":59000,\"name\":\"Jonas\",\"downPayment\":0},{\"salary\":46700,\"name\":\"Emelie\",\"downPayment\":0}],\"price\":5385000,\"pantbrev\":1450400,\"interest\":0.0133}");
  });

  it("should deserialize from object", () => {
    expect(State.deserialize({
      "lenders":[
        {
          "salary": 59000,
          "name": "Jonas",
          "downPayment": 0
        },
        {
          "salary": 46700,
          "name": "Emelie", "downPayment":0
        }
      ],
      "price": 5385000,
      "pantbrev": 1450400,
      "interest": 0.0133
    })).excludingEvery("id").to.deep.equal(new State());
  });

  it("should serialize as string", () => {
    expect(State.deserializeFromString("{\"lenders\":[{\"salary\":59000,\"name\":\"Jonas\",\"downPayment\":0},{\"salary\":46700,\"name\":\"Emelie\",\"downPayment\":0}],\"price\":5385000,\"pantbrev\":1450400,\"interest\":0.0133}")).excludingEvery("id").to.deep.equal(new State());
  });
});
