export const fallBackLanguage = "en";

class LanguageConfiguration {
  regex: RegExp
  displayName: string
  countryShort: string

  constructor(regex: RegExp, displayName: string, countryShort: string) {
    this.regex = regex
    this.displayName = displayName
    this.countryShort = countryShort
  }
}

export const languageToCountryMap: Record<string, LanguageConfiguration> = {
  [fallBackLanguage]: new LanguageConfiguration(/en(-[A-Z]{2})?/, "English", "gb"),
  "sv": new LanguageConfiguration(/sv(-[A-Z]{2})?/, "Svenska", "se"),
  "de": new LanguageConfiguration(/de(-[A-Z]{2})?/, "Deutsch", "de"),
  "fi": new LanguageConfiguration(/fi(-[A-Z]{2})?/, "Suomalainen", "fi")
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
