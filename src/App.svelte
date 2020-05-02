<script>
	import State from "./dto/state";
	import Borrowers from "./modules/Borrowers";
	import Estate from "./modules/Estate";
	import Expenses from "./modules/Expenses";

	export let state = new State();
</script>

<div class="container">
	<div class="row">
		<div class="col">
			<h1>Vad kostar huset?</h1>
		</div>
	</div>
	<Borrowers bind:state={state} />
	<Estate bind:state={state} />
	<Expenses bind:state={state} />
</div>
