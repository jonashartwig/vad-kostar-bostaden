import { expect } from "chai";
import { describe, it } from "mocha";
import { stub } from "sinon";

const dependencyModule = require("../src/modules/load_translations");
import * as language from "../src/modules/language";

describe("language", () => {
  before(() => {
    // @ts-ignore
    global["navigator"] = {
      language: "en-IN"
    };

    // @ts-ignore
    stub(dependencyModule, "load_translations").callsFake(() => {
      // @ts-ignore
      const fs = require('fs');
      const path = require('path');
    
      // @ts-ignore
      function requireContext(base = '.', scanSubDirectories = false, regularExpression = /\.js$/) {
        const files = {};
    
        function readDirectory(directory) {
          fs.readdirSync(directory).forEach(file => {
            const fullPath = path.resolve(directory, file);
    
            if (fs.statSync(fullPath).isDirectory()) {
              if (scanSubDirectories) readDirectory(fullPath);
    
              return;
            }
    
            if (!regularExpression.test(fullPath)) return;
    
            files[fullPath] = true;
          });
        }
    
        readDirectory(path.resolve(__dirname, base));
    
        function Module(file) {
          return require(file);
        }
    
        Module.keys = () => Object.keys(files);
    
        return Module;
      };

      return requireContext("../src/translations", false, /\.json$/);
    })
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
