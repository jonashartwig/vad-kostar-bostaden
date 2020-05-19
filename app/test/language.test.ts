import { expect } from 'chai';
import * as language from '../src/modules/language';

describe("language", () => {
  before(() => {
    global["navigator"] = {
      language: "en-IN"
    };
  });

  it("should load browser language", () => {
    expect(language.getBrowserLanguage()).to.equal("en-IN")
  });

  it("should load inital language", () => {
    expect(language.getInitialLanguage()).to.equal("en")
  });

  it("should load english", () => {
    expect(language.getSupportedLanguageDefault("en")).to.equal("en")
  });

  it("should load english with country", () => {
    expect(language.getSupportedLanguageDefault("en-GB")).to.equal("en")
  });

  it("should load swedish", () => {
    expect(language.getSupportedLanguageDefault("sv")).to.equal("sv")
  });

  it("should load swedish with country", () => {
    expect(language.getSupportedLanguageDefault("sv-SE")).to.equal("sv")
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
  });
});
