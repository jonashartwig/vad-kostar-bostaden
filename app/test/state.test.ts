import { expect, use } from "chai";
import chaiExclude from 'chai-exclude';

import Borrower from "../src/dto/borrower";
import State from "../src/dto/state";

function getState(): State {
  return new State([new Borrower("Jonas", 59000, 0), new Borrower("Emelie", 46700, 0)], 5385000, 1450400, 0.0133);
}

describe("state", () => {
  before(() => {
    use(chaiExclude);
  });

  it("should serialize as object", () => {
    expect(getState().serialize()).to.deep.equal({
      "borrowers":[
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
      "type": 1,
      "price": 5385000,
      "pantbrev": 1450400,
      "interest": 0.0133
    });
  });

  it("should serialize as string", () => {
    expect(getState().serializeToString()).to.deep.equal("{\"borrowers\":[{\"salary\":59000,\"name\":\"Jonas\",\"downPayment\":0},{\"salary\":46700,\"name\":\"Emelie\",\"downPayment\":0}],\"price\":5385000,\"pantbrev\":1450400,\"interest\":0.0133,\"type\":1}");
  });

  it("should deserialize from object", () => {
    expect(State.deserialize({
      "borrowers":[
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
    })).excludingEvery("id").to.deep.equal(getState());
  });

  it("should serialize as string", () => {
    expect(State.deserializeFromString("{\"borrowers\":[{\"salary\":59000,\"name\":\"Jonas\",\"downPayment\":0},{\"salary\":46700,\"name\":\"Emelie\",\"downPayment\":0}],\"price\":5385000,\"pantbrev\":1450400,\"interest\":0.0133}")).excludingEvery("id").to.deep.equal(getState());
  });
});
