<script>
	import "./styles.css";
	import State from "./dto/state";
	import Borrowers from "./modules/Borrowers";
	import Estate from "./modules/Estate";
	import Expenses from "./modules/Expenses";

	export let state = new State();
	let language = "gb"
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
						TODO: Introduction text

						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur congue eros vitae leo hendrerit tristique. Curabitur aliquam viverra dui, et iaculis enim aliquet eget. Sed cursus ipsum massa, quis dictum dui ornare quis. Nulla at efficitur risus, id feugiat ex. Ut in dapibus nulla. Nullam vitae nunc lectus. Maecenas vitae lacus turpis. Suspendisse feugiat risus et urna sagittis pretium. Fusce in ornare nisl. Mauris interdum sodales metus, nec tincidunt justo elementum sit amet. Mauris vehicula tincidunt justo ut finibus.
					</p>
				</div>
			</div>
		</div>
	</section>
	<Borrowers bind:state={state} />
	<Estate bind:state={state} />
	<Expenses bind:state={state} />
</main>
