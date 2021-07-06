<script>
	import { _, locale, addMessages } from "svelte-i18n";
  
    import CollapsableSection from "./CollapsableSection.svelte";
	import * as language from "../modules/language";
	
    import en from "../translations/en.json"
	import de from "../translations/de.json"
	import sv from "../translations/sv.json"
	import fi from "../translations/fi.json"

    const availableLanguages = Object.keys(language.languageToCountryMap);

    addMessages("en", en);
    addMessages("sv", sv);
    addMessages("de", de);
    addMessages("fi", fi);
    
    export let state;

	$: currentLanguage = state.getLanguageOrDefault();
	$: currentCountry = language.languageToCountryMap[currentLanguage].countryShort;

    function setLanguage(language) {
        state = state.withLanguage(language);
        
        locale.set(language);
    }
</script>

<CollapsableSection let:minimized>
    <span slot="title">
        { $_("languages.title") }
    </span>
    <span slot="introduction">
      { $_("languages.introduction") }
    </span>
    <div class="row" slot="content" class:d-none={minimized}>
        {#each availableLanguages as availableLanguage}
            <div class="col">
                <span class:selected={availableLanguage == state.getLanguageOrDefault()}
                    on:click={() => setLanguage(availableLanguage)}
                    style="font-size: 50px; padding: 2px;"
                    class="pointer flag-icon flag-icon-{language.languageToCountryMap[availableLanguage].countryShort}" />
            </div>
        {/each}
        <div class="w-100">
            <p></p>
        </div>
    </div>
</CollapsableSection>