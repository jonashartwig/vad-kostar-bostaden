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

  it("should add empty borrower", () => {
    expect(new State().addBorrower().borrowers[0]).excludingEvery("id").to.deep.equal(new Borrower());
  });

  it("should add given borrower", () => {
    expect(new State().addBorrower(new Borrower("Jonas", 1, 1)).borrowers[0]).excludingEvery("id").to.deep.equal(new Borrower("Jonas", 1, 1));
  });

  it("should remove borrower", () => {
    const state = new State().addBorrower();

    expect(state.removeBorrower(state.borrowers[0].getId()).borrowers.length).to.equal(0);
  });

  it("should calculate combined sallary", () => {
    const state = new State().addBorrower(new Borrower("", 10)).addBorrower(new Borrower("", 20));

    expect(state.getCombinedSalary()).to.equal(360);
  });

  it("should calculate down payment", () => {
    const state = new State().addBorrower(new Borrower("", 0, 10)).addBorrower(new Borrower("", 0, 20));

    expect(state.getCombinedDownPayment()).to.equal(30);
  });

  it("should calculate default down payment", () => {
    expect(new State().getCombinedDownPaymentOrMinimum(100)).to.equal(15);
  });

  it("should calculate loan with minimum down payment", () => {
    expect(new State([], 100).getLoan()).to.equal(85);
  });

  it("should calculate loan with given down payment", () => {
    expect(new State([ new Borrower("", 0, 10) ], 100).getLoan()).to.equal(90);
  });
});
