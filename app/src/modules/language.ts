import { addMessages } from "svelte-i18n";

export const fallBackLanguage = "gb";

function getFileNameOnly(filePath) {
  return filePath.split('/').pop().split('.').shift();
}

// pre-load all the languages, put them into a dictionay by file name
function loadJson() {
  const requireContext = require.context('../translations', false, /\.json$/);
  const json = {};

  requireContext.keys().forEach((key) => {
    const obj = requireContext(key);
    const simpleKey = getFileNameOnly(key);

    json[simpleKey] = obj;
  });

  return json;
}

const translations = loadJson();

class LanguageConfiguration {
  regex: RegExp
  displayName: string
  countryShort: string

  constructor(regex: RegExp, displayName: string, countryShort: string) {
    this.regex = regex
    this.displayName = displayName
    this.countryShort = countryShort

    // add translations to the i18n framework
    addMessages(countryShort, translations[countryShort]);
  }
}

// the map of available languages
export const languageToCountryMap: Record<string, LanguageConfiguration> = {
  [fallBackLanguage]: new LanguageConfiguration(/en(-[A-Z]{2})?/, "English", "gb"),
  "se": new LanguageConfiguration(/sv(-[A-Z]{2})?/, "Svenska", "se"),
  //"de": new LanguageConfiguration(/de(-[A-Z]{2})?/, "Deutsch", "de"),
  //"fi": new LanguageConfiguration(/fi(-[A-Z]{2})?/, "Suomalainen", "fi")
}

export function getBrowserLanguage(): string {
  return (navigator.languages && navigator.languages[0]) || navigator.language;
}

export function getInitialLanguage(): string {
  return getSupportedLanguageDefault(getBrowserLanguage());
}

export function getSupportedLanguageDefault(language: string): string {
  for(let key in languageToCountryMap) {
    if(language.match(languageToCountryMap[key].regex)) {
      return key;
    }
  }

  return fallBackLanguage;
}
