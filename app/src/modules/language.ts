import { addMessages } from "svelte-i18n";

import { load_translations } from "./load_translations";

function getFileNameOnly(filePath: string): string {
  return filePath.split('/').pop().split('.').shift();
}

function parse_translations(): object {
  const json = {};
  const requireContext = load_translations();

  requireContext.keys().forEach((key) => {
    const obj = requireContext(key);
    const simpleKey = getFileNameOnly(key);

    json[simpleKey] = obj;
  });

  return json;
}

function addTranslations(): void {
  const translations = parse_translations();

  for (const [key, value] of Object.entries(translations)) {
    addMessages(key, value);
  }
} 

export class LanguageConfiguration {
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
  }
}

// the map of available languages
export function getLanguageToCountryMap(): Record<string, LanguageConfiguration> {
  // add translations to the i18n framework
  addTranslations();
    
  return {
    [fallBackLanguage]: new LanguageConfiguration(/en(-[A-Z]{2})?/, "English", "gb"),
    //"se": new LanguageConfiguration(/sv(-[A-Z]{2})?/, "Svenska", "se"),
    //"de": new LanguageConfiguration(/de(-[A-Z]{2})?/, "Deutsch", "de"),
    //"fi": new LanguageConfiguration(/fi(-[A-Z]{2})?/, "Suomalainen", "fi")
  };
}

export const fallBackLanguage = "gb";

export function getBrowserLanguage(): string {
  return (navigator.languages && navigator.languages[0]) || navigator.language;
}

export function getInitialLanguage(): string {
  return getSupportedLanguageDefault(getBrowserLanguage());
}

export function getSupportedLanguageDefault(language: string): string {
  const translations = getLanguageToCountryMap()
  
  for(let key in translations) {
    if(language.match(translations[key].regex)) {
      return key;
    }
  }

  return fallBackLanguage;
}
