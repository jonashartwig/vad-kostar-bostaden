<script>
	import { _, register, init, getLocaleFromNavigator, locale, addMessages, locales } from "svelte-i18n";
	import "./styles.css";
	import State from "./dto/state";
	import Borrowers from "./components/Borrowers";
	import Estate from "./components/Estate";
	import Expenses from "./components/Expenses";
	import Interest from "./components/Interest";
	import SaveForLater from "./components/SaveForLater";
	import * as language from "./modules/language";
	import { loadFromLocalStorage } from "./modules/save";
	import en from "./translations/en.json"
	import de from "./translations/de.json"
	import sv from "./translations/sv.json"
	import fi from "./translations/fi.json"

	const browserLanguage = language.getBrowserLanguage(),
		initialLanguage = language.getInitialLanguage(),
		availableLanguages = Object.keys(language.languageToCountryMap);

	init({
	  fallbackLocale: language.fallBackLanguage,
	  initialLocale: initialLanguage
	});

	let currentLanguage = initialLanguage;
	$: currentCountry = language.languageToCountryMap[currentLanguage].countryShort

	locale.subscribe(val => currentLanguage = val);

	addMessages("en", en);
	addMessages("sv", sv);
	addMessages("de", de);
	addMessages("fi", fi);

	export let state = loadFromLocalStorage();
</script>

<header class="vkb-main-color">
	<div class="container">
		<div class="row">
			<div class="col-9">
				<h1>
					{ $_("title") }
				</h1>
			</div>
			<div class="col-3 dropdown vkb-main-color">
					<div class="nav-link dropdown-toggle pointer" id="language-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" role="button" >
						<span class="flag-icon flag-icon-{currentCountry}"></span> { $_("language") }
					</div>
				<div class="dropdown-menu vkb-main-color" aria-labelledby="language-toggle">
					{#each availableLanguages as availableLanguage}
						<div class="dropdown-item vkb-main-color pointer" on:click={ () => locale.set(availableLanguage) }><span class="flag-icon flag-icon-{language.languageToCountryMap[availableLanguage].countryShort}"> </span>  { language.languageToCountryMap[availableLanguage].displayName }</div>
					{/each}
				</div>
			</div>
		</div>
	</div>
</header>
<main>
	<section>
		<div class="container">
			<div class="row">
				<div class="col">
					<p>
						{ $_("introduction.welcome") }
					</p>
					<p>
						{ $_("introduction.dataPolicy") }
					</p>
				</div>
			</div>
		</div>
	</section>
	<Borrowers bind:state={state} />
	<Estate bind:state={state} />
	<Interest bind:state={state} />
	<Expenses bind:state={state} />
	<SaveForLater bind:state={state} />
</main>
<footer class="page-footer font-small vkb-main-color">
	<div class="container">
		<div class="row">
			<div class="col text-center">
				{ $_("footer.visitUs") } <u><a href="https://github.com/jonashartwig/vad-kostar-bostaden">github</a></u>
			</div>
		</div>
	</div>
</footer>
