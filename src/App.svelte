<script>
	import { _, register, init, getLocaleFromNavigator, locale, addMessages, locales } from 'svelte-i18n';
	import "./styles.css";
	import State from "./dto/state";
	import Borrowers from "./modules/Borrowers";
	import Estate from "./modules/Estate";
	import Expenses from "./modules/Expenses";
	import * as language from "./modules/language";
	import en from "./translations/en.json"
	import de from "./translations/de.json"
	import sv from "./translations/sv.json"
	import fi from "./translations/fi.json"

	const browserLanguage = language.getBrowserLanguage(),
		initialLanguage = language.getInitialLanguage(),
		availableLanguages = Object.keys(language.languageToCountryMap);

	init({
	  fallbackLocale: initialLanguage,
	  initialLocale: initialLanguage
	});

	let currentLanguage = initialLanguage;

	locale.subscribe(val => currentLanguage = val);

	addMessages("en", en);
	addMessages("sv", sv);
	addMessages("de", de);
	addMessages("fi", fi);

	export let state = new State();
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
					<div class="nav-link dropdown-toggle" id="language-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" role="button" >
						<span class="flag-icon flag-icon-{language.languageToCountryMap[currentLanguage].countryShort}"></span> { $_("language") }
					</div>
				<div class="dropdown-menu vkb-main-color" aria-labelledby="language-toggle">
					{#each availableLanguages as availableLanguage}
						<div class="dropdown-item vkb-main-color" on:click={ () => locale.set(availableLanguage) }><span class="flag-icon flag-icon-{language.languageToCountryMap[availableLanguage].countryShort}"> </span>  { language.languageToCountryMap[availableLanguage].displayName }</div>
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
						This page tries to collect information for you who wants to buy a place to live in Sweden. It will help you understand the costs that await you.
						Start by adding individuals who will apply for the loan. Adding name and cash is optional, the salary is required. Additional information can be found in each section.
					</p>
					<p>
						We do not save any of the data you enter in the form below. We dont use any cookies or any other form of tracking either.
						We believe in that you own your data.
					</p>
				</div>
			</div>
		</div>
	</section>
	<Borrowers bind:state={state} />
	<Estate bind:state={state} />
	<Expenses bind:state={state} />
</main>
<footer class="page-footer font-small vkb-main-color">
	<div class="container">
		<div class="row">
			<div class="col text-center">
				Visit us on <a href="https://github.com/jonashartwig/vad-kostar-bostaden">github</a>
			</div>
		</div>
	</div>
</footer>
