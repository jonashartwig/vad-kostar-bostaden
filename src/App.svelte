<script>
	import { register, init, getLocaleFromNavigator } from 'svelte-i18n';
	import "./styles.css";
	import State from "./dto/state";
	import Borrowers from "./modules/Borrowers";
	import Estate from "./modules/Estate";
	import Expenses from "./modules/Expenses";

	init({
	  fallbackLocale: "en",
	  initialLocale: "en"
	});

	let language = "gb"

	export let state = new State();
</script>

<header class="vkb-main-color">
	<div class="container">
		<div class="row">
			<div class="col-9">
				<h1>
					Vad kostar bostaden?
				</h1>
			</div>
			<div class="col-3 dropdown vkb-main-color">
					<div class="nav-link dropdown-toggle" id="language-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" role="button" >
						<span class="flag-icon flag-icon-{language}"></span> Language
					</div>
					<div class="dropdown-menu vkb-main-color" aria-labelledby="language-toggle">
							<div class="dropdown-item vkb-main-color" on:click={ () => language = "de" }><span class="flag-icon flag-icon-de"> </span>  German</div>
							<div class="dropdown-item vkb-main-color" on:click={ () => language = "se" }><span class="flag-icon flag-icon-se"> </span>  Swedish</div>
							<div class="dropdown-item vkb-main-color" on:click={ () => language = "gb" }><span class="flag-icon flag-icon-gb"> </span>  English</div>
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
						This page tries to collect information fot you who wants to buy a place to live in sweden. It will help you understand the costs that await you.
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
