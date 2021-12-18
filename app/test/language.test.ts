import { expect } from "chai";
import { describe, it } from "mocha";

import * as language from "../src/modules/language";

describe("language", () => {
  before(() => {
    // @ts-ignore
    global["navigator"] = {
      language: "en-IN"
    };
  });

  it("should load browser language", () => {
    expect(language.getBrowserLanguage()).to.equal("en-IN")
  });

  it("should load inital language", () => {
    expect(language.getInitialLanguage()).to.equal("gb")
  });

  it("should load english", () => {
    expect(language.getSupportedLanguageDefault("gb")).to.equal("gb")
  });

  it("should load english with country", () => {
    expect(language.getSupportedLanguageDefault("en-GB")).to.equal("gb")
  });

  // TODO: add back later
  /*it("should load swedish", () => {
    expect(language.getSupportedLanguageDefault("sv")).to.equal("se")
  });

  it("should load swedish with country", () => {
    expect(language.getSupportedLanguageDefault("sv-SE")).to.equal("se")
  });

  it("should load german", () => {
    expect(language.getSupportedLanguageDefault("de")).to.equal("de")
  });

  it("should load german with country", () => {
    expect(language.getSupportedLanguageDefault("de-DE")).to.equal("de")
  });

  it("should load finnish", () => {
    expect(language.getSupportedLanguageDefault("fi")).to.equal("fi")
  });

  it("should load finnish with country", () => {
    expect(language.getSupportedLanguageDefault("fi-FI")).to.equal("fi")
  });

  it("should fallback to english", () => {
    expect(language.getSupportedLanguageDefault("whatever")).to.equal("en")
  });*/
});
