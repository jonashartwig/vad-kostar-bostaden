import { addMessages } from "svelte-i18n";

function getFileNameOnly(filePath) {
    return filePath.split('/').pop().split('.').shift();
}

function loadJson (path: string): object {
  const json = {};
  const requireContext = require.context('../translations', false, /\.json$/);

  requireContext.keys().forEach((key) => {
    const obj = requireContext(key);
    const simpleKey = getFileNameOnly(key);

    json[simpleKey] = obj;
  });

  return json;
}

class LanguageConfiguration {
    // used to  match browser languages to country
    regex: RegExp
    // the native name of that country
    displayName: string
    // the two letter abbreviation of that country
    countryShort: string
  
    constructor(regex: RegExp, displayName: string, countryShort: string) {
      this.regex = regex
      this.displayName = displayName
      this.countryShort = countryShort
  
      // add translations to the i18n framework
      addMessages(countryShort, loadJson("../translations")[countryShort]);
    }
  }

  export const fallBackLanguage = "gb";
  
  // the map of available languages
  export default function(): Record<string, LanguageConfiguration> {
    return {
      [fallBackLanguage]: new LanguageConfiguration(/en(-[A-Z]{2})?/, "English", "gb"),
      "se": new LanguageConfiguration(/sv(-[A-Z]{2})?/, "Svenska", "se"),
      //"de": new LanguageConfiguration(/de(-[A-Z]{2})?/, "Deutsch", "de"),
      //"fi": new LanguageConfiguration(/fi(-[A-Z]{2})?/, "Suomalainen", "fi")
    };
  }