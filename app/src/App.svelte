<script>
	import { _, register, init, getLocaleFromNavigator, locale, addMessages, locales } from "svelte-i18n";
	import "./styles.css";
	import State from "./dto/state";
	import Introduction from "./components/Introduction";
	import Bills from "./components/Bills";
	import Borrowers from "./components/Borrowers";
	import Estate from "./components/Estate";
	import ExpensesOneOff from "./components/ExpensesOneOff";
	import ExpensesRecurring from "./components/ExpensesRecurring";
	import Interest from "./components/Interest";
	import SaveForLater from "./components/SaveForLater";
	import Languages from "./components/Languages";
	import * as language from "./modules/language";
	import { loadFromLocalStorage, loadFromUrl, canBeLoadedFromParam } from "./modules/save";
	
	export let state = loadFromUrl() || loadFromLocalStorage() || new State();

	init({
	  fallbackLocale: language.fallBackLanguage,
	  initialLocale: state.getLanguageOrDefault()
	});

	if(canBeLoadedFromParam()) {
		window.history.replaceState({}, document.title, "/")
	}
</script>

<header class="vkb-main-color">
	<div class="container">
		<div class="row">
			<div class="col-9">
				<h1>
					{ $_("title") }
				</h1>
			</div>
		</div>
	</div>
</header>
<main>
	<Introduction bind:state={state} />
	<Languages bind:state={state} />
	<Borrowers bind:state={state} />
	<Estate bind:state={state} />
	<ExpensesOneOff bind:state={state} />
	<Bills bind:state={state} />
	<Interest bind:state={state} />
	<ExpensesRecurring bind:state={state} />
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
