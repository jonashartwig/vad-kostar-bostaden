<script>
	import { _, locale } from "svelte-i18n";

  import CollapsableSection from "./CollapsableSection.svelte";
	import * as language from "../modules/language";

  const languageToCountryMap = language.getLanguageToCountryMap()
  const availableLanguages = Object.keys(languageToCountryMap);

  export let state;

	$: currentLanguage = state.getLanguageOrDefault();
	$: currentCountry = languageToCountryMap[currentLanguage].countryShort;

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
                    class="pointer flag-icon flag-icon-{languageToCountryMap[availableLanguage].countryShort}" />
            </div>
        {/each}
				<div>
					<span on:click={() => window.open("https://github.com/jonashartwig/vad-kostar-bostaden")} style="font-size: 50px; padding: 2px;" class="pointer flag-icon"><i class="far fa-plus-square"></i></span>
				</div>
        <div class="w-100">
            <p></p>
        </div>
    </div>
</CollapsableSection>
